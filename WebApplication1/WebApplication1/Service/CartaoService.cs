using MySql.Data.MySqlClient;
namespace WebApplication1.Service
{
    public class CartaoService
    {
        private readonly BD _bd;
        public CartaoService(BD bd)
        {
            _bd = bd;
        }
        public Entidade.Cartao? Obter(string numero)
        {

            var conn = _bd.CriarConexao();


            MySqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = $@"select *
                                 from Cartao
                                 where Numero = @numero";

            cmd.Parameters.AddWithValue("@numero", numero);
            conn.Open();

            MySqlDataReader dr = cmd.ExecuteReader();
            Entidade.Cartao? cartao = null;
            if (dr.Read())
            {
                
                cartao = new Entidade.Cartao()
                {
                    Numero = dr["Numero"].ToString(),
                    Validade = DateTime.Parse(dr["Validade"].ToString()) 
                };
            }
            conn.Close();

            return cartao;
        }
    }
}
