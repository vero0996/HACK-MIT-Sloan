var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // ensure JSON matches camelCase expected by frontend
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// ✅ Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins(
                "http://localhost:5173",   // Vite default
                "http://localhost:3000",   // React default
                "https://unchalked-arboreally-chase.ngrok-free.dev" // Ngrok tunnel
            );
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Always use routing first
app.UseRouting();

// ✅ Use CORS before everything else that touches requests
app.UseCors("AllowFrontend");

// Optional: Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseAuthorization();

// ✅ Map controllers after routing, before Swagger redirect
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

// ✅ Optionally redirect root to Swagger for convenience
app.MapGet("/", () => Results.Redirect("/swagger"));

// Run application
app.Run();
