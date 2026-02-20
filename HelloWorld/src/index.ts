export function greet(name?: string): string {
  return `Hello, ${name ?? 'World'}!`;
}

if (require.main === module) {
  console.log(greet());
}
