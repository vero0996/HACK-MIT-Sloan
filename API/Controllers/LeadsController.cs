using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    
    [Route("[controller]")]
    public class LeadsController : Controller
    {
        //String de conexión, ajustarla a su instancia de MySql
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=CRM;Uid=root;password=rootroot;";
        
        // GET: Get Leads
        [HttpGet]
        public List<Leads> Get()
        {
            //Genera una lista
            List<Leads> listaLeads = new List<Leads>();
            Leads leadsItem = new Leads();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "SELECT * FROM Leads";

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    //Genera un nuevo item y lo llena con el renglon leido del query
                    leadsItem = new Leads();
                    leadsItem.IdLead = Convert.ToInt32(reader["IdLead"]);
                    leadsItem.IdUser = Convert.ToInt32(reader["IdUser"]);
                    leadsItem.Company = reader["Company"]?.ToString() ?? string.Empty;
                    leadsItem.Email = reader["Email"]?.ToString() ?? string.Empty;
                    leadsItem.Phone = reader["Phone"]?.ToString() ?? string.Empty;
                    leadsItem.Status = reader["Status"]?.ToString() ?? string.Empty;
                    leadsItem.LeadSource = reader["LeadSource"]?.ToString() ?? string.Empty;
                    leadsItem.Priority = reader["Priority"]?.ToString() ?? string.Empty;
                    leadsItem.Created_At = Convert.ToDateTime(reader["Created_At"]);
                    leadsItem.Updated_At = Convert.ToDateTime(reader["Updated_At"]);

                    // Agrega el Item leido a la lista
                    listaLeads.Add(leadsItem);
                }
            }

            //----- Finaliza conexión
            conexion.Close();

            return listaLeads;
        }

        // POST Lead Info
        [HttpPost]
        public void PostLead([FromBody] Leads leadsItem)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY INSERT ---------------------------------------            
            cmd.CommandText = "INSERT INTO Leads(IdUser, Company, Email, Phone, Status, LeadSource, Priority, Created_At, Updated_At) VALUES(@IDUSER, @COMPANY, @EMAIL, @PHONE, @STATUS, @LEADSOURCE, @PRIORITY, NOW(), NOW());";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@IDUSER", leadsItem.IdUser);
            cmd.Parameters.AddWithValue("@COMPANY", leadsItem.Company);
            cmd.Parameters.AddWithValue("@EMAIL", leadsItem.Email);
            cmd.Parameters.AddWithValue("@PHONE", leadsItem.Phone);
            cmd.Parameters.AddWithValue("@STATUS", leadsItem.Status);
            cmd.Parameters.AddWithValue("@LEADSOURCE", leadsItem.LeadSource);
            cmd.Parameters.AddWithValue("@PRIORITY", leadsItem.Priority);

            //----- Prepara y ejecuta el INSERT (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            //----- Finaliza la conexion
            conexion.Close();
        }

        // DELETE: Leads/5
        [HttpDelete("{IdLead}")]
        public void DeleteLead(int id)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY DELETE ---------------------------------------
            cmd.CommandText = "DELETE FROM Leads WHERE IdLead = @IDLEAD";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@IDLEAD", id);

            //----- Prepara y ejecuta el DELETE (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
            //----- Finaliza la conexion
            conexion.Close();
        }
    }
}
