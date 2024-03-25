# Entrenamientos CMAT

## Tabla de contenidos

<ol>
<li> [Un poco de historia](#historia) </li>
<li> [¿Cómo utilizo la plataforma?](#howto) </li>
</ol>

## Un poco de historia<a name="historia"></a>
El objetivo de este proyecto es proveer al campeonato de matematicas CMAT con una plataforma para entregar material de apoyo a los estudiantes participantes. Esta plataforma se empezó a desarrollar en febrero de 2024 en un esfuerzo realizado por Marcel Antoine Metayer Chávez quien disfruta mucho de poder enseñar y se presentó de voluntario para llevar a cabo la iniciativa de los entrenamientos; y Hernán Antonio Poblete Yañez, quien tiene una que otra experiencia en programación y cree en el uso de la tecnología para disminuir la brecha en el aprendizaje. 

Esta dupla delusoriamente tuvo el sueño de esta plataforma y lo materializaron en este repositorio.

## ¿Cómo utilizo la plataforma? <a name="howto"></a>

Si estás leyendo este documento, es muy probable que seas por lo menos uno de tres tipos de persona.

Si simplemente eres una persona muy curiosa, desde ya te felicito. En mi (corta) experiencia en el mundo real, la curiosidad es una energía que es capaz de llevarte a los lugares y experiencias más divertidos.

Si eres alguien del equipo académico CMAT, espero que la experiencia usando esta plataforma no sea tan mala y si tienen dudas, feedback o necesitan incorporar alguna característica al programa, siempre pueden consultarme.

Si eres una persona que genuinamente quiere utilizar esta plataforma y no morir en el intento, hay un par de cosas que debes saber:

<ol>
<li>Tras clonar el repositorio, necesitarás crear un archivo de variables de entorno .env , donde vas a tener que agregar las variables PORT con el número de puerto que va a recibir las solicitudes, SECRET_KEY con algún string y MONGO_CONNECTION con el string de conexión a tu base de datos de mongo. Aún así, es posible utilizar la plataforma sin este archivo. Se utilizarán en vez variables que asigné por defecto.</li>

<li>Necesitarás de las siguientes tecnologías para poder utilizar la plataforma:
<ul>
<li>MongoDB o acceso a una base de datos basada en mongo</li>
<li>Nodejs</li>
<li>Algún manager de paquetes para node como npm o yarn. Para este proyecto, yo utilicé npm</li>
</ul>
</li>


</ol>

Una vez teniendo estas cosas claras, hay que crear un usuario admin en la base de datos (archivo para hacerlo de manera automatica coming soon). 

El objeto minimo para crear un usuario con la clave 123456789 en mongo shell es el siguiente:

{
    nombre: 'Jane Doe',
    rut: '123456789',
    password: '$2b$15$IIDh1joNxDWlOUMiRg86/uvaV7a3b67tMBr./ZGnVNYR6afIfeqx.',
    acceso: 0
}