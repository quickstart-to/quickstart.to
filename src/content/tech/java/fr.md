---
title: "Java"
description: "Démarrez avec le langage de programmation Java en 5 minutes"
template: "language"
tags: ["programming", "backend", "enterprise"]
---

## TL;DR

**En bref** : Java est le cheval de bataille de l'entreprise - écrire une fois, exécuter partout, débugger partout.

**Points forts** :
- Indépendant de la plateforme (JVM tourne sur tout)
- Écosystème mature avec des bibliothèques pour tout
- Typage fort détecte les erreurs à la compilation
- Excellent outillage et support IDE

## Philosophy

Java a été conçu pour le monde réel :

- **Write Once, Run Anywhere** - Compiler en bytecode, exécuter sur n'importe quelle JVM. Pas de recompilation pour différentes plateformes.
- **Explicite plutôt que magique** - Verbeux mais prévisible. Vous savez exactement ce qui se passe.
- **Rétrocompatibilité** - Le code de 1995 compile toujours. Votre investissement est protégé.
- **Sécurité d'abord** - Pas d'arithmétique de pointeurs, gestion automatique de la mémoire, vérification forte des types.

Java évite intentionnellement les fonctionnalités "astucieuses". L'objectif est un code maintenable par des équipes, pas impressionnant pour des individus.

## Quick Start

### Install

```bash
# macOS
brew install openjdk@25

# Linux (Ubuntu/Debian)
sudo apt install openjdk-25-jdk

# Windows - download from adoptium.net
```

### Verify (latest LTS: 25)

```bash
java --version   # java 25.0.1
javac --version
```

### First Program

Créez `Hello.java` :
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
# Compiler et exécuter (méthode classique)
javac Hello.java
java Hello

# Ou exécuter directement (Java 11+)
java Hello.java
```

### Modern Java (21+)

```java
// Méthode main simplifiée (fonctionnalité preview)
void main() {
    println("Hello, World!");
}
```

## Language Essentials

### Variables & Types

```java
// Primitifs
int age = 25;
double price = 19.99;
boolean active = true;
char grade = 'A';

// Types référence
String name = "Alice";
int[] numbers = {1, 2, 3};

// Inférence de type (Java 10+)
var list = new ArrayList<String>();
var map = Map.of("key", "value");
```

### Control Flow

```java
// if-else
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}

// Switch amélioré (Java 14+)
String result = switch (day) {
    case MONDAY, FRIDAY -> "Work";
    case SATURDAY, SUNDAY -> "Rest";
    default -> "Unknown";
};

// Boucle for
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// for-each
for (String item : items) {
    System.out.println(item);
}
```

### Functions (Methods)

```java
// Méthode d'instance
public String greet(String name) {
    return "Hello, " + name;
}

// Méthode statique
public static int add(int a, int b) {
    return a + b;
}

// Varargs
public void print(String... messages) {
    for (String msg : messages) {
        System.out.println(msg);
    }
}
```

### Error Handling

```java
// Try-catch
try {
    int result = divide(10, 0);
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
} finally {
    System.out.println("Always runs");
}

// Try-with-resources (fermeture auto)
try (var reader = new FileReader("file.txt")) {
    // reader se ferme automatiquement
}

// Optional (éviter null)
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(System.out::println);
```

### Classes & Records

```java
// Classe traditionnelle
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // getters, setters...
}

// Record (Java 16+) - classe de données immuable
public record User(String name, int age) {}

// Utilisation
var user = new User("Alice", 25);
System.out.println(user.name());
```

## Gotchas

### == vs .equals()

```java
String a = new String("hello");
String b = new String("hello");

a == b        // false! Compare les références
a.equals(b)   // true - compare les valeurs

// Utilisez .equals() pour les objets, == pour les primitifs
```

### NullPointerException

```java
String s = null;
s.length();  // NullPointerException!

// Solution : vérification null ou Optional
if (s != null) {
    System.out.println(s.length());
}
// Ou utiliser Optional
Optional.ofNullable(s).ifPresent(str -> System.out.println(str.length()));
```

### Class name must match filename

```java
// Fichier : MyClass.java
public class MyClass { }  // Doit être exactement MyClass

// Une seule classe public par fichier
```

### Arrays are fixed size

```java
int[] arr = new int[5];  // Ne peut pas grandir

// Utilisez ArrayList pour une taille dynamique
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
```

## When to Choose

**Idéal pour** :
- Applications d'entreprise (banque, assurance)
- Développement Android (natif)
- Grandes équipes nécessitant un code maintenable
- Projets à long terme (10+ ans)

**Moins adapté pour** :
- Scripts rapides (utilisez Python)
- Programmation système (utilisez Rust, C++)
- Applications web simples (utilisez Node.js, Go)

**Comparaison** :
| Aspect | Java | C# | Kotlin | Go |
|--------|------|-------|--------|-----|
| Verbosité | Élevée | Moyenne | Basse | Basse |
| Vitesse | Rapide | Rapide | Rapide | Plus rapide |
| Apprentissage | Moyen | Moyen | Facile | Facile |
| Plateforme | JVM | .NET | JVM | Natif |

## Next Steps

- [Dev.java](https://dev.java/learn/) - Tutoriels officiels
- [Documentation Java](https://docs.oracle.com/en/java/)
- [Baeldung](https://www.baeldung.com/) - Tutoriels pratiques
- [Spring Boot](/spring-boot) - Framework web

## Ecosystem

### Build Tools

```bash
# Maven
mvn archetype:generate    # Créer un projet
mvn compile               # Compiler
mvn test                  # Exécuter les tests
mvn package               # Construire le JAR

# Gradle
gradle init               # Créer un projet
gradle build              # Construire
gradle test               # Exécuter les tests
```

### Popular Libraries

- **Web** : Spring Boot, Quarkus, Micronaut
- **Base de données** : Hibernate, JDBC, jOOQ
- **Tests** : JUnit, Mockito, AssertJ
- **Utilitaires** : Guava, Apache Commons, Lombok
