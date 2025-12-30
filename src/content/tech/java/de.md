---
title: "Java"
description: "Starten Sie mit der Java-Programmiersprache in 5 Minuten"
template: "language"
tags: ["programming", "backend", "enterprise"]
---

## TL;DR

**Einzeiler**: Java ist das Arbeitspferd der Unternehmenswelt - einmal schreiben, überall ausführen, überall debuggen.

**Kernstärken**:
- Plattformunabhängig (JVM läuft auf allem)
- Ausgereiftes Ökosystem mit Bibliotheken für alles
- Starke Typisierung fängt Fehler zur Kompilierzeit ab
- Ausgezeichnete Tools und IDE-Unterstützung

## Philosophy

Java wurde für die reale Welt entwickelt:

- **Write Once, Run Anywhere** - Zu Bytecode kompilieren, auf jeder JVM ausführen. Kein Neukompilieren für verschiedene Plattformen.
- **Explizit statt Magie** - Wortreich aber vorhersagbar. Sie wissen genau, was passiert.
- **Rückwärtskompatibilität** - Code von 1995 kompiliert immer noch. Ihre Investition ist geschützt.
- **Sicherheit zuerst** - Keine Zeigerarithmetik, automatische Speicherverwaltung, starke Typprüfung.

Java vermeidet absichtlich "clevere" Features. Das Ziel ist Code, der von Teams wartbar ist, nicht beeindruckend für Einzelne.

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

Erstellen Sie `Hello.java`:
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
# Kompilieren und ausführen (klassisch)
javac Hello.java
java Hello

# Oder direkt ausführen (Java 11+)
java Hello.java
```

### Modern Java (21+)

```java
// Einfachere main-Methode (Preview-Feature)
void main() {
    println("Hello, World!");
}
```

## Language Essentials

### Variables & Types

```java
// Primitive
int age = 25;
double price = 19.99;
boolean active = true;
char grade = 'A';

// Referenztypen
String name = "Alice";
int[] numbers = {1, 2, 3};

// Typinferenz (Java 10+)
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

// Erweitertes switch (Java 14+)
String result = switch (day) {
    case MONDAY, FRIDAY -> "Work";
    case SATURDAY, SUNDAY -> "Rest";
    default -> "Unknown";
};

// for-Schleife
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
// Instanzmethode
public String greet(String name) {
    return "Hello, " + name;
}

// Statische Methode
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

// Try-with-resources (automatisch schließen)
try (var reader = new FileReader("file.txt")) {
    // reader schließt automatisch
}

// Optional (null vermeiden)
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(System.out::println);
```

### Classes & Records

```java
// Traditionelle Klasse
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // getters, setters...
}

// Record (Java 16+) - unveränderliche Datenklasse
public record User(String name, int age) {}

// Verwendung
var user = new User("Alice", 25);
System.out.println(user.name());
```

## Gotchas

### == vs .equals()

```java
String a = new String("hello");
String b = new String("hello");

a == b        // false! Vergleicht Referenzen
a.equals(b)   // true - vergleicht Werte

// Verwenden Sie .equals() für Objekte, == für Primitive
```

### NullPointerException

```java
String s = null;
s.length();  // NullPointerException!

// Lösung: null-Check oder Optional
if (s != null) {
    System.out.println(s.length());
}
// Oder Optional verwenden
Optional.ofNullable(s).ifPresent(str -> System.out.println(str.length()));
```

### Class name must match filename

```java
// Datei: MyClass.java
public class MyClass { }  // Muss genau MyClass sein

// Nur eine public class pro Datei
```

### Arrays are fixed size

```java
int[] arr = new int[5];  // Kann nicht wachsen

// Verwenden Sie ArrayList für dynamische Größe
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
```

## When to Choose

**Ideal für**:
- Enterprise-Anwendungen (Banking, Versicherungen)
- Android-Entwicklung (nativ)
- Große Teams, die wartbaren Code benötigen
- Langlebige Projekte (10+ Jahre)

**Nicht ideal für**:
- Schnelle Skripte (verwenden Sie Python)
- Systemprogrammierung (verwenden Sie Rust, C++)
- Einfache Web-Apps (verwenden Sie Node.js, Go)

**Vergleich**:
| Aspekt | Java | C# | Kotlin | Go |
|--------|------|-------|--------|-----|
| Ausführlichkeit | Hoch | Mittel | Niedrig | Niedrig |
| Geschwindigkeit | Schnell | Schnell | Schnell | Schneller |
| Lernen | Mittel | Mittel | Einfach | Einfach |
| Plattform | JVM | .NET | JVM | Nativ |

## Next Steps

- [Dev.java](https://dev.java/learn/) - Offizielle Tutorials
- [Java Documentation](https://docs.oracle.com/en/java/)
- [Baeldung](https://www.baeldung.com/) - Praktische Tutorials
- [Spring Boot](/spring-boot) - Web-Framework

## Ecosystem

### Build Tools

```bash
# Maven
mvn archetype:generate    # Projekt erstellen
mvn compile               # Kompilieren
mvn test                  # Tests ausführen
mvn package               # JAR erstellen

# Gradle
gradle init               # Projekt erstellen
gradle build              # Erstellen
gradle test               # Tests ausführen
```

### Popular Libraries

- **Web**: Spring Boot, Quarkus, Micronaut
- **Datenbank**: Hibernate, JDBC, jOOQ
- **Testing**: JUnit, Mockito, AssertJ
- **Utilities**: Guava, Apache Commons, Lombok
