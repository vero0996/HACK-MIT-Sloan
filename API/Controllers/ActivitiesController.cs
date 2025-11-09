using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model; // Use the API.Model namespace
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; // Use MySql client

namespace API.Controllers
{
    
    [Route("[controller]")]
    public class ActivitiesController : Controller
    {
        //String de conexión, matches your other controllers
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=CRM;Uid=root;password=rootroot;";
        
        // GET: Get Activities
        [HttpGet]
        public List<Activities> Get()
        {
            List<Activities> listaActivities = new List<Activities>();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "SELECT * FROM Activities";

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Activities activityItem = new Activities();
                    activityItem.IdActivity = Convert.ToInt32(reader["IdActivity"]);
                    activityItem.IdUser = Convert.ToInt32(reader["IdUser"]);
                    
                    // Handle nullable IdLead
                    if (reader.IsDBNull(reader.GetOrdinal("IdLead")))
                    {
                        activityItem.IdLead = null;
                    }
                    else
                    {
                        activityItem.IdLead = Convert.ToInt32(reader["IdLead"]);
                    }

                    activityItem.Description = reader["Description"].ToString();
                    activityItem.Category = reader["Category"].ToString();
                    activityItem.Created_At = Convert.ToDateTime(reader["Created_At"]);

                    listaActivities.Add(activityItem);
                }
            }
            //----- Finaliza la conexion
            conexion.Close();
            //----- Retorna la lista con todos los items
            return listaActivities;
        }

        // POST: Post Activity
        [HttpPost]
        public void PostActivity([FromBody] Activities activityItem)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY INSERT ---------------------------------------            
            cmd.CommandText = "INSERT INTO Activities(IdUser, IdLead, Description, Category, Created_At) VALUES(@IDUSER, @IDLEAD, @DESCRIPTION, @CATEGORY, NOW());";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@IDUSER", activityItem.IdUser);
            
            // Handle nullable IdLead
            if (activityItem.IdLead.HasValue)
            {
                cmd.Parameters.AddWithValue("@IDLEAD", activityItem.IdLead.Value);
            }
            else
            {
                cmd.Parameters.AddWithValue("@IDLEAD", DBNull.Value);
            }

            cmd.Parameters.AddWithValue("@DESCRIPTION", activityItem.Description);
            cmd.Parameters.AddWithValue("@CATEGORY", activityItem.Category);

            //----- Prepara y ejecuta el INSERT (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            //----- Finaliza la conexion
            conexion.Close();
        }

        // DELETE: Activities/5
        [HttpDelete("{id}")]
        public void DeleteActivity(int id)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY DELETE ---------------------------------------
            cmd.CommandText = "DELETE FROM Activities WHERE IdActivity = @IDACTIVITY";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@IDACTIVITY", id);

            //----- Prepara y ejecuta el DELETE (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
            //----- Finaliza la conexion
            conexion.Close();
        }
    }
}