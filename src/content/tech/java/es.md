---
title: "Java"
description: "Comienza con el lenguaje de programación Java en 5 minutos"
template: "language"
tags: ["programming", "backend", "enterprise"]
---

## TL;DR

**En resumen**: Java es el caballo de batalla empresarial - escribe una vez, ejecuta en cualquier lugar, depura en todas partes.

**Fortalezas principales**:
- Independiente de plataforma (JVM ejecuta en todo)
- Ecosistema maduro con bibliotecas para todo
- Tipado fuerte detecta errores en tiempo de compilación
- Excelentes herramientas y soporte de IDE

## Philosophy

Java fue diseñado para el mundo real:

- **Write Once, Run Anywhere** - Compila a bytecode, ejecuta en cualquier JVM. Sin recompilar para diferentes plataformas.
- **Explícito sobre mágico** - Verboso pero predecible. Sabes exactamente qué está pasando.
- **Retrocompatibilidad** - Código de 1995 aún compila. Tu inversión está protegida.
- **Seguridad primero** - Sin aritmética de punteros, gestión automática de memoria, verificación fuerte de tipos.

Java evita intencionalmente características "inteligentes". El objetivo es código mantenible por equipos, no impresionante para individuos.

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

Crea `Hello.java`:
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
# Compilar y ejecutar (forma clásica)
javac Hello.java
java Hello

# O ejecutar directamente (Java 11+)
java Hello.java
```

### Modern Java (21+)

```java
// Método main simplificado (característica preview)
void main() {
    println("Hello, World!");
}
```

## Language Essentials

### Variables & Types

```java
// Primitivos
int age = 25;
double price = 19.99;
boolean active = true;
char grade = 'A';

// Tipos de referencia
String name = "Alice";
int[] numbers = {1, 2, 3};

// Inferencia de tipos (Java 10+)
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

// Switch mejorado (Java 14+)
String result = switch (day) {
    case MONDAY, FRIDAY -> "Work";
    case SATURDAY, SUNDAY -> "Rest";
    default -> "Unknown";
};

// Bucle for
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
// Método de instancia
public String greet(String name) {
    return "Hello, " + name;
}

// Método estático
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

// Try-with-resources (cierre automático)
try (var reader = new FileReader("file.txt")) {
    // reader se cierra automáticamente
}

// Optional (evitar null)
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(System.out::println);
```

### Classes & Records

```java
// Clase tradicional
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // getters, setters...
}

// Record (Java 16+) - clase de datos inmutable
public record User(String name, int age) {}

// Uso
var user = new User("Alice", 25);
System.out.println(user.name());
```

## Gotchas

### == vs .equals()

```java
String a = new String("hello");
String b = new String("hello");

a == b        // false! Compara referencias
a.equals(b)   // true - compara valores

// Usa .equals() para objetos, == para primitivos
```

### NullPointerException

```java
String s = null;
s.length();  // NullPointerException!

// Solución: verificación null u Optional
if (s != null) {
    System.out.println(s.length());
}
// O usar Optional
Optional.ofNullable(s).ifPresent(str -> System.out.println(str.length()));
```

### Class name must match filename

```java
// Archivo: MyClass.java
public class MyClass { }  // Debe ser exactamente MyClass

// Solo una clase public por archivo
```

### Arrays are fixed size

```java
int[] arr = new int[5];  // No puede crecer

// Usa ArrayList para tamaño dinámico
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
```

## When to Choose

**Ideal para**:
- Aplicaciones empresariales (banca, seguros)
- Desarrollo Android (nativo)
- Equipos grandes que necesitan código mantenible
- Proyectos de larga duración (10+ años)

**No ideal para**:
- Scripts rápidos (usa Python)
- Programación de sistemas (usa Rust, C++)
- Apps web simples (usa Node.js, Go)

**Comparación**:
| Aspecto | Java | C# | Kotlin | Go |
|--------|------|-------|--------|-----|
| Verbosidad | Alta | Media | Baja | Baja |
| Velocidad | Rápida | Rápida | Rápida | Más rápida |
| Aprendizaje | Medio | Medio | Fácil | Fácil |
| Plataforma | JVM | .NET | JVM | Nativo |

## Next Steps

- [Dev.java](https://dev.java/learn/) - Tutoriales oficiales
- [Documentación de Java](https://docs.oracle.com/en/java/)
- [Baeldung](https://www.baeldung.com/) - Tutoriales prácticos
- [Spring Boot](/spring-boot) - Framework web

## Ecosystem

### Build Tools

```bash
# Maven
mvn archetype:generate    # Crear proyecto
mvn compile               # Compilar
mvn test                  # Ejecutar tests
mvn package               # Construir JAR

# Gradle
gradle init               # Crear proyecto
gradle build              # Construir
gradle test               # Ejecutar tests
```

### Popular Libraries

- **Web**: Spring Boot, Quarkus, Micronaut
- **Base de datos**: Hibernate, JDBC, jOOQ
- **Testing**: JUnit, Mockito, AssertJ
- **Utilidades**: Guava, Apache Commons, Lombok
