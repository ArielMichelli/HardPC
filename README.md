# 🖥️ HardPC - Tienda de Componentes y Accesorios para PC

¡Bienvenido a **HardPC**!  
Una tienda web completa para la gestión y venta de productos de hardware, desarrollada con tecnologías modernas y pensada para ser fácil de usar, mantener y escalar.

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Security** (autenticación básica)
- **JPA/Hibernate**
- **MySQL** (base de datos relacional)
- **Lombok**
- **Maven**

### Frontend
- **HTML5 & CSS3**
- **Bootstrap 5**
- **JavaScript ES6**
- **Fetch API**

### Otros
- **Git & GitHub** (control de versiones)
- **.env** para variables sensibles

---

## 📦 Estructura del Proyecto

```
HardPC/
│
├── HardPc-Back/      # Backend (Spring Boot)
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── HardPc-Front/     # Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── js/
│   └── ...
│
├── .env              # Variables de entorno (NO subir a producción)
├── .gitignore
└── README.md
```

---

## ⚡ Cómo ejecutar el proyecto

### 1. Clona el repositorio

```sh
git clone https://github.com/ArielMichelli/HardPC.git
cd hardpc
```

### 2. Configura la base de datos

- Crea una base de datos MySQL llamada `techlabdb`.
- Configura el usuario y contraseña en el archivo `.env` y en `application.properties` del backend.

### 3. Ejecuta el Backend

```sh
cd HardPc-Back
mvn spring-boot:run
```
El backend corre por defecto en `http://localhost:8080`.

### 4. Ejecuta el Frontend

Puedes abrir el archivo `index.html` directamente o usar una extensión como **Live Server** en VS Code:

- Haz clic derecho en `index.html` → "Open with Live Server"
- O abre en tu navegador:  
  `http://127.0.0.1:5500/HardPc-Front/index.html`

### 5. Acceso y autenticación

- Usuario: `admin`
- Contraseña: `admin`
- La autenticación es **Basic Auth** (el frontend ya la envía en las peticiones).

---

## 🛠️ Funcionalidades principales

- Listado dinámico de productos
- Agregar y eliminar productos (con autenticación)
- Visualización de detalles de producto
- Carrito de compras (frontend)
- Reseñas y sección de redes sociales
- Responsive design (Bootstrap)

---

## 💡 Notas

- El archivo `.env` **no debe subirse a producción**.
- El backend carga productos de ejemplo automáticamente si usas `spring.jpa.hibernate.ddl-auto=create` y tienes el archivo `data.sql`.
- Puedes personalizar los estilos y funcionalidades según tus necesidades.

---

## 🤝 Contribuciones

¡Pull requests y sugerencias son bienvenidas!  
Siéntete libre de forkear el proyecto y mejorarlo.

---

## 📄 Licencia

MIT

---

**Desarrollado por A.M para Hard-PC**  
¡¡¡Gracias por visitar este proyecto!!!
