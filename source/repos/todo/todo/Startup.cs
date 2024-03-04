using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        string? connectionString = Configuration.GetConnectionString("DefaultConnection");

        if (connectionString != null)
        {
            services.AddDbContext<TodoDbContext>(options =>
                options.UseSqlite(connectionString));
        }
        else
        {
            // Handle the case where connectionString is null
        }

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // Configure middleware, routing, etc.
    }
}