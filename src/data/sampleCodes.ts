
export const sampleCodes = {
  "sample1.py": `def factorial(n):
    """Calculate the factorial of a number."""
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

def main():
    num = 5
    result = factorial(num)
    print(f"The factorial of {num} is {result}")

if __name__ == "__main__":
    main()`,

  "sample2.py": `def factorial(n):
    """Compute the factorial of a positive integer."""
    if n <= 1:
        return 1
    else:
        return n * factorial(n-1)

def main():
    number = 5
    result = factorial(number)
    print(f"Factorial of {number} equals {result}")

if __name__ == "__main__":
    main()`,

  "sample3.py": `def calculate_factorial(number):
    """Get factorial using iteration instead of recursion."""
    result = 1
    for i in range(1, number + 1):
        result *= i
    return result

def main():
    num = 5
    fact = calculate_factorial(num)
    print(f"The factorial of {num} is {fact}")

if __name__ == "__main__":
    main()`,

  "sample4.py": `class MathOperations:
    """A class for common math operations."""
    
    @staticmethod
    def factorial(number):
        if number < 0:
            raise ValueError("Factorial not defined for negative numbers")
        
        result = 1
        for i in range(1, number + 1):
            result *= i
        return result

def main():
    try:
        num = 5
        result = MathOperations.factorial(num)
        print(f"Factorial result: {result}")
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()`,

  "sample5.py": `def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

def display_sequence(length):
    """Print Fibonacci sequence up to given length."""
    sequence = [fibonacci(i) for i in range(length)]
    print(f"Fibonacci sequence: {sequence}")

def main():
    length = 10
    display_sequence(length)

if __name__ == "__main__":
    main()`
};
