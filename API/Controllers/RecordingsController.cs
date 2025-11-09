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
    public class RecordingsController : Controller
    {
        //String de conexión, matches your other controllers
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=CRM;Uid=root;password=rootroot;";
        
        // GET: Get Recordings
        [HttpGet]
        public List<Recordings> Get()
        {
            List<Recordings> listaRecordings = new List<Recordings>();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "SELECT * FROM Recordings";

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Recordings recordingItem = new Recordings();
                    recordingItem.IdRecording = Convert.ToInt32(reader["IdRecording"]);
                    recordingItem.IdLead = Convert.ToInt32(reader["IdLead"]);
                    recordingItem.Title = reader["Title"].ToString();
                    recordingItem.Duration = reader["Duration"].ToString();
                    recordingItem.Status = reader["Status"].ToString();
                    recordingItem.Source = reader["Source"].ToString();
                    recordingItem.FilePath = reader["FilePath"].ToString();
                    recordingItem.Transcription = reader["Transcription"].ToString();
                    recordingItem.Created_At = Convert.ToDateTime(reader["Created_At"]);
                    recordingItem.Updated_At = Convert.ToDateTime(reader["Updated_At"]);

                    listaRecordings.Add(recordingItem);
                }
            }
            //----- Finaliza la conexion
            conexion.Close();
            //----- Retorna la lista con todos los items
            return listaRecordings;
        }

        // POST: Post Recording
        [HttpPost]
        public void PostRecording([FromBody] Recordings recordingItem)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY INSERT ---------------------------------------            
            cmd.CommandText = "INSERT INTO Recordings(IdLead, Title, Duration, Status, Source, FilePath, Transcription, Created_At, Updated_At) VALUES(@IDLEAD, @TITLE, @DURATION, @STATUS, @SOURCE, @FILEPATH, @TRANSCRIPTION, NOW(), NOW());";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@IDLEAD", recordingItem.IdLead);
            cmd.Parameters.AddWithValue("@TITLE", recordingItem.Title);
            cmd.Parameters.AddWithValue("@DURATION", recordingItem.Duration);
            cmd.Parameters.AddWithValue("@STATUS", recordingItem.Status);
            cmd.Parameters.AddWithValue("@SOURCE", recordingItem.Source);
            cmd.Parameters.AddWithValue("@FILEPATH", recordingItem.FilePath);
            cmd.Parameters.AddWithValue("@TRANSCRIPTION", recordingItem.Transcription);

            //----- Prepara y ejecuta el INSERT (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            //----- Finaliza la conexion
            conexion.Close();
        }

        // DELETE: Recordings/5
        [HttpDelete("{id}")]
        public void DeleteRecording(int id)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY DELETE ---------------------------------------
            cmd.CommandText = "DELETE FROM Recordings WHERE IdRecording = @IDRECORDING";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@IDRECORDING", id);

            //----- Prepara y ejecuta el DELETE (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            
            //----- Finaliza la conexion
            conexion.Close();
        }
    }
}