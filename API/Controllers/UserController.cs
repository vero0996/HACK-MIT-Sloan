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
    public class UserController : Controller
    {
        //String de conexión, ajustarla a su instancia de MySql
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=CRM;Uid=root;password=rootroot;";
        
        // GET: Get Users
        [HttpGet]
        public List<User> Get()
        {
            //Genera una lista
            List<User> listaUser = new List<User>();
            User userItem = new User();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "Select * from User";

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    //Genera un nuevo item y lo llena con el renglon leido del query
                    userItem = new User();
                    userItem.IdUser = Convert.ToInt32(reader["IdUser"]);
                    userItem.Username = reader["Username"]?.ToString() ?? string.Empty;
                    userItem.Password = reader["Password"]?.ToString() ?? string.Empty;
                    userItem.FirstName = reader["FirstName"]?.ToString() ?? string.Empty;
                    userItem.LastName = reader["LastName"]?.ToString() ?? string.Empty;
                    userItem.Email = reader["Email"]?.ToString() ?? string.Empty;
                    userItem.JobTitle = reader["JobTitle"]?.ToString() ?? string.Empty;
                    userItem.Created_At = Convert.ToDateTime(reader["Created_At"]);
                    userItem.Updated_At = Convert.ToDateTime(reader["Updated_At"]);

                    //Agrega el Item leido a la lista
                    listaUser.Add(userItem);
                }
            }

            //----- Finaliza conexión
            conexion.Close();

            return listaUser;
        }

        // POST User Info
        [HttpPost]
        public void PostUser([FromBody] User userItem)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY INSERT ---------------------------------------            
            cmd.CommandText = "INSERT INTO User(Username, Password, FirstName, LastName, Email, JobTitle, Created_At, Updated_At) VALUES(@USERNAME, @PASSWORD, @FIRSTNAME, @LASTNAME, @EMAIL, @JOBTITLE, NOW(), NOW());";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@USERNAME", userItem.Username);
            cmd.Parameters.AddWithValue("@PASSWORD", userItem.Password);
            cmd.Parameters.AddWithValue("@FIRSTNAME", userItem.FirstName);
            cmd.Parameters.AddWithValue("@LASTNAME", userItem.LastName);
            cmd.Parameters.AddWithValue("@EMAIL", userItem.Email);
            cmd.Parameters.AddWithValue("@JOBTITLE", userItem.JobTitle);

            //----- Prepara y ejecuta el INSERT (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            //----- Finaliza la conexion
            conexion.Close();
        }

    }
}

