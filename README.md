Here’s an updated version of your **README.md** with icons added to make it more visually appealing. I’ve included commonly used icons from platforms like Font Awesome or simple emojis. 

---

# 🚀 **Système de réservation de salles de coworking**  

## 📄 **Description :**  
Une application pour gérer la réservation de salles dans des espaces de coworking. Ce système permet aux utilisateurs de rechercher, réserver et gérer les salles. Les administrateurs peuvent gérer les salles, suivre les réservations et les revenus.  

---

## 🌟 **Fonctionnalités principales :**  

### 👤 **Utilisateur :**  
- 🛋️ Réservation de salles avec paiement en ligne.  
- ✏️ Annulation ou modification des réservations existantes.  

### 🔑 **Administrateur :**  
- 🏢 Gestion des salles (ajout, modification, suppression).  
- 📊 Suivi des réservations et des revenus générés.  

### 📈 **Tableau de bord dynamique :**  
- 📊 Statistiques sur l'utilisation des salles.  
- 📉 Visualisation graphique des réservations et des revenus.  

---

## 🛠️ **Technologies :**  
- **🖥️ Backend :** Spring Boot (gestion des réservations avec validations complexes).  
- **🌐 Frontend :** React.  
- **🗄️ Base de données :** MySQL.  
- **💳 Paiement :** Reçu généré et téléchargeable en ligne.  

---

## 📂 **Architecture du projet :**  

### 🛡️ **Backend**  
Le backend utilise **Spring Boot** pour créer une application robuste et scalable.  

### 📑 **Structure du Projet :**  
1. **📌 ma.projet.coworking**  
   - **🚀 CoworkingApplication.java:** Point d'entrée de l'application Spring Boot.  
2. **🌍 controller:** Gère les requêtes HTTP.  
3. **⚠️ exception:** Gestion des exceptions.  
4. **📊 model:** Définition des entités JPA.  
5. **🗃️ repository:** Interfaces Spring Data JPA.  
6. **📥 request:** Objets pour les données des requêtes.  
7. **📤 response:** Structuration des réponses HTTP.  
8. **🔒 security:** Configuration JWT.  
9. **🧠 service:** Logique métier.  

---


### 📑 **diagramme de classe :**  
![diagrammeclasse](https://github.com/user-attachments/assets/13feee87-35d6-4c68-a43a-8ebea8fb0644)




### 📑 **Conception des fonctionnalit´es du systeme :** 

![casutilisation](https://github.com/user-attachments/assets/0ba79d89-2720-46dd-8163-305813bb5649)

## **video demo**


https://github.com/user-attachments/assets/05d64ea5-faca-4edb-be44-5d609ed95452



## 🎨 **Frontend**  
Le frontend est développé avec **React**, permettant une navigation fluide et intuitive.  

---

## 🐳 **Docker Image**  
Le projet peut être facilement conteneurisé avec **Docker** pour simplifier le déploiement.  



version: '3'

services:
  mysql:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: cocoworking
    ports:
      - "3306:3306"
    volumes:
    - ./cocoworking.sql:/docker-entrypoint-initdb.d/cocoworking.sql

  backend:
    build:
      context: ./backend
    ports:
      - "9090:9090"
    depends_on:
      - mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/cocoworking
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
    healthcheck:
      test: "/usr/bin/mysql --user=root --password=root --execute \"SHOW DATABASES;\""
      interval: 5s
      timeout: 2s
      retries: 100

  frontend:
    build:
      context: ./coworking-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "8081:80"
    volumes:
    - ./path/to/custom/php.ini:/etc/php/7.4/apache2/php.ini



---

## 🚀 **Guide de démarrage :**  

### ✅ **Prérequis :**  
- **📦 Git**  
- **☕ Java Development Kit (JDK)**  
- **🛠️ Apache Maven**  
- **🗄️ MySQL**  
- **🌐 Node.js et npm**  

### ⚙️ **Configuration Backend :**  
1. **📥 Clonez le projet :**  
   ```bash
   git clone <repository_url>
   cd <E:\examnewversion\salle-coworking\salle-coworking\back-end>
   ```
2. **🛠️ Configurez la base de données :**  
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/cocoworking?useSSL=false
   spring.datasource.username=root
   spring.datasource.password=
   spring.jpa.hibernate.ddl-auto=update 
   ```
3. **📦 Installez les dépendances :**  
   ```bash
   mvn clean install
   ```
4. **🚀 Démarrez le backend :**  
   ```bash
   mvn spring-boot:run
   ```
   - Accédez à : [http://localhost:9090](http://localhost:9090)  

### 🖥️ **Configuration Frontend :**  
1. **📥 Clonez le projet :**  
   ```bash
   git clone <repository_url>
   cd <E:\examnewversion\salle-coworking\salle-coworking\coworking-frontend>
   ```
2. **📦 Installez les dépendances :**  
   ```bash
   npm install
   ```
3. **🚀 Démarrez le frontend :**  
   ```bash
   npm start
   ```
   - Accédez à : [http://localhost:3000](http://localhost:3000)  

---

## 🔐 **Authentification :**  

- **👤 Utilisateur :**  
   - ✉️ Email : ihssane@ihssane  
   - 🔑 Mot de passe : 123  

- **🛡️ Administrateur :**  
   - ✉️ Email : test@example.com  
   - 🔑 Mot de passe : password123  

---


## 🤝 **Contribuer :**  
Nous encourageons les contributions !  

1. 🍴 **Forkez le projet**  
2. 🌱 **Créez une branche**  
3. 📝 **Ajoutez vos modifications**  
4. 📤 **Soumettez une Pull Request**  

---

## 👥 **Contributeurs :**  

- 🧑‍💻 **Ihssane Elmaizi** — [GitHub](https://github.com/Ihssanf)  
- 👩‍💻 **Kaoutar Okayl** — [GitHub](https://github.com/votre-lien-github-kaoutar)  
- 👨‍💻 **Mohamed Lachgar**  

