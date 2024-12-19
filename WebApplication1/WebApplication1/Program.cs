
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Serilog.AspNetCore;
using Serilog;
using Serilog.Formatting.Compact;
using Serilog.Sinks.File;



var logFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs");
Directory.CreateDirectory(logFolder);

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File(new CompactJsonFormatter(),
           Path.Combine(logFolder, ".json"),
            retainedFileCountLimit: 10,
            rollingInterval: RollingInterval.Month)
    .WriteTo.File(Path.Combine(logFolder, ".log"),
            retainedFileCountLimit: 1,
            rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Gerenciamento de Pagamento e Cartão- API",
        Version = "v1",
        Description = $@"<h3>Api de Pagamento</h3>
                          <p>
                              Prova de C#
                          </p>",
        Contact = new OpenApiContact
        {
            Name = "Suporte Unoeste",
            Email = string.Empty,
            Url = new Uri("https://www.unoeste.br"),
        },
    });
    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

});

builder.Services.AddControllers();

var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
string pathAppSettings = "appsettings.json";

if (env == "Development")
{
    pathAppSettings = "appsettings.Development.json";
}

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile(pathAppSettings)
    .Build();


var connectionString =
     config.GetSection("ConnectionString").Value;
Environment.SetEnvironmentVariable("CONNECTION_STRING", connectionString);

//Adicionando AlunoService ao IOC
builder.Services.AddScoped(typeof(WebApplication1.Service.CartaoService));
builder.Services.AddScoped(typeof(WebApplication1.Service.PagamentoService));

//Adicionado o BD ao IOC
builder.Services.AddSingleton<WebApplication1.BD>(new WebApplication1.BD());

var app = builder.Build();

// *** Usa o Middleware de autenticação e autorização
app.UseAuthorization();
app.UseAuthentication();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    c.RoutePrefix = ""; //habilitar a página inicial da API ser a doc.
    c.DocumentTitle = "Gerenciamento de Produtos - API V1";
});

app.MapControllers();

app.Run();
