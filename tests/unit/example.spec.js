describe("Example component", () => {
  test("Debe ser mayor a 10", () => {
    // Arrange
    let value = 10;

    // act
    value = value + 2;

    // Assert
    expect(value).toBeGreaterThan(10);
  });
});
