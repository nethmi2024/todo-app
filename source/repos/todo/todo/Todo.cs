public class Todo
{
    public int Id { get; set; }
    public string? Text { get; set; } // Nullable property

    // Constructor to initialize properties
    public Todo()
    {
        Text ??= ""; // Initialize Text property if needed
    }
}
