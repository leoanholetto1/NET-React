using MySql.Data.MySqlClient;
using Serilog;
using WebApplication1.Entidade;
namespace WebApplication1.Service
{
    public class PagamentoService
    {
        private readonly BD _bd;
        public PagamentoService(BD bd)
        {
            _bd = bd;
        }
        public Entidade.Pagamento? Obter(int id)
        {

            var conn = _bd.CriarConexao();


            MySqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = $@"select *
                                 from Transacao
                                 where TransacaoId = @id";

            cmd.Parameters.AddWithValue("@id", id);
            conn.Open();

            MySqlDataReader dr = cmd.ExecuteReader();
            Entidade.Cartao? cartao;
            Entidade.Pagamento? pagamento = null;
            if (dr.Read())
            {
                cartao = new Entidade.Cartao();
                cartao.Numero = dr["Cartao"].ToString();
                Entidade.Pagamento.Situacao situacao;
                if (Convert.ToInt32(dr["Situacao"]) == 1)
                {
                    situacao = Entidade.Pagamento.Situacao.Pendente;
                }
                else if (Convert.ToInt32(dr["Situacao"]) == 2)
                {
                    situacao = Entidade.Pagamento.Situacao.Confirmado;
                }
                else
                {
                    situacao = Entidade.Pagamento.Situacao.Cancelado;
                }

                pagamento = new Entidade.Pagamento()
                {
                    Id = Convert.ToInt32(dr["TransacaoId"]),
                    Valor = Convert.ToDecimal(dr["Valor"]),
                    Cartao = cartao,
                    CVV = dr["CVV"].ToString(),
                    Parcelas = Convert.ToInt32(dr["Parcelas"]),
                    situacao = situacao
                };
                
            }

            conn.Close();

            return pagamento;
        }

        public bool Confirmar(int id)
        {
            bool confirmado = false;
            var conn = _bd.CriarConexao();

            MySqlCommand cmd = conn.CreateCommand();

            //insert/delete/update/sp/function
            cmd.CommandText = $@"UPDATE Transacao SET Situacao = @Situacao WHERE TransacaoId = @Id;";

            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@Situacao", Entidade.Pagamento.Situacao.Confirmado);
            
            try
            {
                if (conn.State != System.Data.ConnectionState.Open)
                    conn.Open();

                int qtdeLinhasAfetadas = cmd.ExecuteNonQuery();
                confirmado = true;
            }
            catch (Exception ex)
            {
                Log.Logger.Error(ex, "Ocorreu um erro ao executar a operação.");
            }
            finally
            {
                conn.Close();
            }

            return confirmado;
        }

        public bool Cancelar(int id)
        {
            bool cancelado = false;
            var conn = _bd.CriarConexao();

            MySqlCommand cmd = conn.CreateCommand();

            //insert/delete/update/sp/function
            cmd.CommandText = $@"UPDATE Transacao SET Situacao = @Situacao WHERE TransacaoId = @Id;";

            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@Situacao", Entidade.Pagamento.Situacao.Cancelado);

            try
            {
                if (conn.State != System.Data.ConnectionState.Open)
                    conn.Open();

                int qtdeLinhasAfetadas = cmd.ExecuteNonQuery();
                cancelado = true;
            }
            catch (Exception ex)
            {
                Log.Logger.Error(ex, "Ocorreu um erro ao executar a operação.");
            }
            finally
            {
                conn.Close();
            }

            return cancelado;
        }

        public int ultimo()
        {
            int max = 0;
            var conn = _bd.CriarConexao();


            MySqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = $@"select max(TransacaoId)
                                 from Transacao";

            conn.Open();

            max = Convert.ToInt32(cmd.ExecuteScalar());

            conn.Close();

            return max;

        }

        public bool Salvar(Entidade.Pagamento pagamento)
        {

            bool sucesso = false;

            var conn = _bd.CriarConexao();

            MySqlCommand cmd = conn.CreateCommand();

            //insert/delete/update/sp/function
            cmd.CommandText = $@"INSERT INTO Transacao (Valor, Cartao, CVV, Parcelas,Situacao)
                                 VALUES(@Valor,@Cartao,@CVV,@Parcelas,@Situacao)";

            cmd.Parameters.AddWithValue("@Valor", pagamento.Valor);
            cmd.Parameters.AddWithValue("@Cartao", pagamento.Cartao.Numero);
            cmd.Parameters.AddWithValue("@CVV", pagamento.CVV);
            cmd.Parameters.AddWithValue("@Parcelas", pagamento.Parcelas);
            cmd.Parameters.AddWithValue("@Situacao", pagamento.situacao);

            try
            {

                if (conn.State != System.Data.ConnectionState.Open)
                    conn.Open();
                int qtdeLinhasAfetadas = cmd.ExecuteNonQuery();
                //int id = Convert.ToInt32(cmd.LastInsertedId);
                cmd.CommandText = $@"SELECT LAST_INSERT_ID()";
                int id = Convert.ToInt32(cmd.ExecuteScalar());
                pagamento.Id = id;
                sucesso = true;
            }
            catch (Exception ex)
            {
                Log.Logger.Error(ex, "Ocorreu um erro ao executar a operação.");
            }
            finally
            {
                conn.Close();
            }

            return sucesso;

        }
    }
}
