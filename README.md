# mongoose-ramirez-luana

## Justificacion de las relaciones:

1. Justificación 1:N (User <-> Post) (referenciado)
   El crecimiento ilimitado, ya que un usuario puede escribir muchísimos post y los documentos en MongoBD tiene un limíte de tamaño de 16mb, y si se embebiera un array de post dentro del documento User un usuario muy activo inevitablemente llegaría al límite de 16mb además que para hacer consultas como "los últimos 10 post" tardaría más ya que primero tendría que analizar toda la colección de usuarios.

2. Justificación N:M (Post <-> Tag) (referenciado)
   Para mantener la integridad única de los datos, ya que como las tags deben ser únicas si fueran embebidas podrian haber etiquetas como "JavaScript", "javascript" o "js" que hacen referencia a lo mismo pero con datos distintos, también para facilitar la actualización, ya que si se hace referenciado tendría que ir solamento a mi colección de Tag y cambiar el nombre, sino tendría que ir actualizando post por post lo que es poco eficiente y lento.

3. Jusficiacion 1:1 (User<->Profile) (referenciado)
   Para mantener separados los datos públicos y los sensibles, ya que el schema User tiene datos como el username, email y password que sirven para la autenticación y el perfil tiene datos como el la bibliografía, las redes sociales del user o la foto de perfil que son más públicos.

4. Jusficicacion Embebida (address y social_media en el schema profile)
   Ya que que un perfil tiene UNA direción y UN conjunto de redes sociales no pasaría el límite de 16mb de MongoDB además que nunca vas a querer consultar una dirección sin consultar el perfil al que pertenece y lo mismo que con las redes ya que los datos "pertenecen" directamente al padre.

## Investigar:

1. Como se utiliza el populate desde las colecciones que no tienen referencias.
   Utilizamos el atributo .virtual, es una característica de mongoose que te permite obtener datos no relacionados de otra colección
   Primero debemos configurar el schema donde queremos el populate y colocarle
   `toJSON: { virtuals: true }`, esto para hacer visible mis campos virtuales (en mi caso post y profile) cuando enviamos el documento como un .json, luego añadimos este codigo fuera del schema

   ```javascript
   tuSchema.virtual("nombre_del_campo_virtual", {
     ref: "NombreDelModeloAConectar", // El nombre del schema que se quiere traer
     localField: "campo_de_este_modelo", // El campo del schema actual (es decir donde pongas esta funcion) que usa como el valor para buscar por ejemplo: "_id"
     foreignField: "campo_del_otro_modelo", // El campo en el otro schema que coincide con la llave local por ejemplo: "author"
   });
   ```

2. Como se realizan las eliminaciones lógicas y en cascada.

   #### ● Lógica

   Concepto: La eliminación lógica es un patrón de diseño donde nunca borras realmente los datos de la base de datos.

   Aplicación:
   Primero en el schema que deseamos que sea eliminacion logica ponemos un atributo con deleteAt y default en null,
   luego en el controlador no ponemos ya `.findByIdAndDelete() ` sino `findByIdAndUpdate()`
   y reemplazamos el deleteAt con el new Date, asi que lo que hace al "eliminar" es solo actualizar el deleteAt con la fecha actual, opcional, se realiza un "hook" para que hacer las consultas que contengan "find" cualquiera que sea solo traiga las que tengas deleteAt = null es decir las que no se borraron.

   #### ● Cascada

   Concepto: La eliminación en cascada es una regla de integridad que cuando un documento 'Padre' se elimina, todos los documentos 'Hijos' que dependen de él deben ser eliminados automáticamente.

   Aplicación:

   Debemos realizar un "hook" en el schema padre, en el hook debemos implementar la la lógica que despues (post) de hacer un findOneAndDelete se ejecute un delete(many o one depende) y elimine, en mi caso por ejemplo eliminar el perfil donde el "User" coincida con el id del user borrado

   ```javascript
   //post porque es después, si fuera antes sería pre
   schemaPadre.post("findOneAndDelete", async function (doc) {
     if (doc) {
       try {
         //Aqui borramos los hijos A en relaciones 1:N
         await ModeloHijo_A.deleteMany({ campoQueReferenciaAlPadre: doc._id });
         // Borramos el hijo B en relacion 1:1
         await ModeloHijo_B.deleteOne({ campoQueReferenciaAlPadre: doc._id });
       } catch (error) {
         console.error("Error durante el borrado en cascada:", error);
       }
     }
   });
   ```

3. Cómo crear un endpoint que permita agregar un nuevo vínculo en una relación
   muchos a muchos.

   Ya que mi relacion de muchos a muchos con post y tags y que post tiene un campo tags que es un array de ObjetcIds, crear un nuevo vínculo no significa crear un nuevo documento, solo actualizar el post para añadir un nuevo id de Tag al array de tags

   Para eso, usé en mi post.controller.js en addTagToPost el $addToSet, que solo añade el id al array si ese Id no existe ya en el array para que no tenga etiquetas duplicadas
   Y en mi ruta utilicé patch ya que como no estamos reemplazando campos solo añadiendo es la mejor opcion ya que solo inserta el id
   y mi ruta queda así
   <br>
   routePost.patch("/posts/:post_id/tags/:tag_id", addTagToPost);
   <br>
   :post_id y :tag_id para que post actualizar y que tag añadir.
