---
title: "JUnit"
description: "Java 单元测试框架 - 注解、断言、测试生命周期管理，企业级应用必备"
template: "tool"
tags: ["java", "testing", "automation"]
---

## TL;DR

**是什么**：Java 应用最广泛使用的测试框架。

**为什么用**：Java 测试标准、注解、断言、测试生命周期、IDE 集成。

## Quick Start

**添加依赖**（Maven）：
```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
```

**创建测试**（`src/test/java/CalculatorTest.java`）：
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

**运行测试**：
```bash
mvn test           # Maven
./gradlew test     # Gradle
```

## Cheatsheet

| 注解 | 描述 |
|------------|-------------|
| `@Test` | 标记测试方法 |
| `@BeforeEach` | 每个测试前运行 |
| `@AfterEach` | 每个测试后运行 |
| `@BeforeAll` | 所有测试前运行一次 |
| `@AfterAll` | 所有测试后运行一次 |
| `@Disabled` | 跳过测试 |
| `@DisplayName` | 自定义测试名称 |

## Gotchas

### 断言

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

### 生命周期

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

### 参数化测试

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

### 嵌套测试

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

### Mockito 集成

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

- [JUnit 5 用户指南](https://junit.org/junit5/docs/current/user-guide/) - 官方文档
- [JUnit 5 示例](https://github.com/junit-team/junit5-samples) - 示例
- [Mockito](https://site.mockito.org/) - Mock 框架
- [AssertJ](https://assertj.github.io/doc/) - 流式断言
