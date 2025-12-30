---
title: "JUnit"
description: "Java unit testing framework - annotations, assertions, test lifecycle management for enterprise apps"
template: "tool"
tags: ["java", "testing", "automation"]
---

## TL;DR

**What**: The most widely used testing framework for Java applications.

**Why**: Standard for Java testing, annotations, assertions, test lifecycle, IDE integration.

## Quick Start

**Add dependency** (Maven):
```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
```

**Create test** (`src/test/java/CalculatorTest.java`):
```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    @Test
    void addition() {
        assertEquals(4, 2 + 2);
    }
}
```

**Run tests**:
```bash
mvn test           # Maven
./gradlew test     # Gradle
```

## Cheatsheet

| Annotation | Description |
|------------|-------------|
| `@Test` | Mark test method |
| `@BeforeEach` | Run before each test |
| `@AfterEach` | Run after each test |
| `@BeforeAll` | Run once before all |
| `@AfterAll` | Run once after all |
| `@Disabled` | Skip test |
| `@DisplayName` | Custom test name |

## Gotchas

### Assertions

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AssertionsTest {
    @Test
    void basicAssertions() {
        assertEquals(4, 2 + 2);
        assertNotEquals(5, 2 + 2);
        assertTrue(5 > 3);
        assertFalse(3 > 5);
        assertNull(null);
        assertNotNull("hello");
    }

    @Test
    void objectAssertions() {
        assertSame(obj1, obj1);
        assertArrayEquals(new int[]{1, 2}, new int[]{1, 2});
        assertIterableEquals(List.of(1, 2), List.of(1, 2));
    }

    @Test
    void exceptionAssertions() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("Invalid input");
        });
        assertEquals("Invalid input", exception.getMessage());
    }

    @Test
    void groupedAssertions() {
        assertAll("person",
            () -> assertEquals("John", person.getName()),
            () -> assertEquals(30, person.getAge())
        );
    }
}
```

### Lifecycle

```java
import org.junit.jupiter.api.*;

class LifecycleTest {
    @BeforeAll
    static void setupAll() {
        System.out.println("Before all tests");
    }

    @AfterAll
    static void teardownAll() {
        System.out.println("After all tests");
    }

    @BeforeEach
    void setup() {
        System.out.println("Before each test");
    }

    @AfterEach
    void teardown() {
        System.out.println("After each test");
    }

    @Test
    void test1() {}

    @Test
    void test2() {}
}
```

### Parameterized tests

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;

class ParameterizedTests {
    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void testWithValueSource(int number) {
        assertTrue(number > 0);
    }

    @ParameterizedTest
    @CsvSource({
        "1, 1, 2",
        "2, 3, 5",
        "10, 20, 30"
    })
    void testAddition(int a, int b, int expected) {
        assertEquals(expected, a + b);
    }

    @ParameterizedTest
    @MethodSource("provideStrings")
    void testWithMethodSource(String arg) {
        assertNotNull(arg);
    }

    static Stream<String> provideStrings() {
        return Stream.of("apple", "banana", "cherry");
    }
}
```

### Nested tests

```java
import org.junit.jupiter.api.Nested;

class NestedTest {
    @Nested
    class WhenLoggedIn {
        @Test
        void canAccessDashboard() {}

        @Test
        void canViewProfile() {}
    }

    @Nested
    class WhenLoggedOut {
        @Test
        void redirectsToLogin() {}
    }
}
```

### Mockito integration

```java
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceTest {
    @Mock
    private UserRepository userRepository;

    @Test
    void findUser() {
        when(userRepository.findById(1L))
            .thenReturn(Optional.of(new User("John")));

        User user = userRepository.findById(1L).get();
        assertEquals("John", user.getName());
        verify(userRepository).findById(1L);
    }
}
```

## Next Steps

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/) - Official docs
- [JUnit 5 Samples](https://github.com/junit-team/junit5-samples) - Examples
- [Mockito](https://site.mockito.org/) - Mocking framework
- [AssertJ](https://assertj.github.io/doc/) - Fluent assertions
