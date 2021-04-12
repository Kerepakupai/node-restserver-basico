# Webserver + RestServer

1. Clonar el repositorio *** modificar el nombre del proyecto ***
```
git clone https://github.com/Kerepakupai/node-restserver-basico.git <nombre_projecto>
```

2. Ir a la carpeta del proyecto
```
cd <nombre_proyecto>
```

3. Inatalar dependencias
```
npm install
```

4. Ejecutar servidor
```
npm start
```

## Crear un release Tag
```
git tag -a v1.0.0 -m "restserver basico"
git push --tags
```

### En github.com Tags -> Edit release -> Purchase release 

## Subir aplicacion a Heroku
```
heroku login
heroku git:remote -a kerepakupai-node-webserver
git push heroku main
```

## Subir cambios a Heroku
```
git add .
git commit -m "commit mensaje"
git push heroku main
```

## Configurar variables de entorno en Heroku
### removemos el archivo .env del seguimiento
```
git rm .env --cached

heroku config
heroku config:set <VAR>"<VALUE>" 
heroku push heroku main
```
