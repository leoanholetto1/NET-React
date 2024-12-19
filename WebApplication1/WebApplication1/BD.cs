using MySql.Data.MySqlClient;
namespace WebApplication1
{
    public class BD
    {
        public MySqlConnection CriarConexao()
        {
            string strCon = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            MySqlConnection conn
                = new MySqlConnection(strCon);

            return conn;
        }
    }
}
