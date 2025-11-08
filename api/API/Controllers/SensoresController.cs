using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APISensores.Model;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APISensores.Controllers
{
    
    [Route("[controller]")]
    public class SensoresController : Controller
    {
        //String de conexión, ajustarla a su instancia de MySql
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=bdSensores;Uid=root;password=rootroot;";

        // GET: sensores/values
        [HttpGet]
        public List<RegistroDatos> Get()
        {
            //Genera una lista de mediciones vacia y un elemento individual
            List<RegistroDatos> listaRegistros = new List<RegistroDatos>();
            RegistroDatos registroItem = new RegistroDatos();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "Select * from RegistroDatos";

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    //Genera un nuevo item y lo llena con el renglon leido del query
                    registroItem = new RegistroDatos();
                    registroItem.IdRegistro = Convert.ToInt32(reader["IdRegistro"]);
                    registroItem.ValorDato = Convert.ToDouble(reader["ValorDato"]);
                    registroItem.FechaDato = Convert.ToDateTime(reader["FechaDato"]);
                    //Agrega el Item leido a la lista
                    listaRegistros.Add(registroItem);
                }
            }

            //----- Finaliza conexión
            conexion.Close();

            return listaRegistros;
        }

        // GET: Otro endpoint GET -> Con Parámetro
        // Regresara el registro de datos en base al ID puesto
        [HttpGet("{idRegistro}")]
        public RegistroDatos Get(int idRegistro)
        {
            //Genera una lista de mediciones vacia y un elemento individual
            RegistroDatos registroItem = new RegistroDatos();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "SELECT * FROM RegistroDatos WHERE IdRegistro = @ID_1";
            cmd.Parameters.AddWithValue("@ID_1", idRegistro);

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                if (reader.Read()) // Si puede leer (encontrar) el registro
                {
                    //Genera un nuevo item y lo llena con el renglon leido del query
                    registroItem.IdRegistro = Convert.ToInt32(reader["IdRegistro"]);
                    registroItem.ValorDato = Convert.ToDouble(reader["ValorDato"]);
                    registroItem.FechaDato = Convert.ToDateTime(reader["FechaDato"]);
                }
            }

            //----- Finaliza conexión
            conexion.Close();

            return registroItem;
        }

        // GET: Otro endpoint GET -> Con PATH distinto (Obtener los ultimos 3 registros)
        [HttpGet("GetTop3")]
        public List<RegistroDatos> GetTop()
        {
            //Genera una lista de mediciones vacia y un elemento individual
            List<RegistroDatos> listaRegistros = new List<RegistroDatos>();
            RegistroDatos registroItem = new RegistroDatos();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "SELECT * FROM RegistroDatos ORDER BY FechaDato DESC LIMIT 3";

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    //Genera un nuevo item y lo llena con el renglon leido del query
                    registroItem = new RegistroDatos();
                    registroItem.IdRegistro = Convert.ToInt32(reader["IdRegistro"]);
                    registroItem.ValorDato = Convert.ToDouble(reader["ValorDato"]);
                    registroItem.FechaDato = Convert.ToDateTime(reader["FechaDato"]);
                    //Agrega el Item leido a la lista
                    listaRegistros.Add(registroItem);
                }
            }

            //----- Finaliza conexión
            conexion.Close();

            return listaRegistros;
        }

        // GET: Combinar: Con PATH distinto + Parámetro (Obtener top selecionado)
        [HttpGet("GetTop/{n}")]
        public List<RegistroDatos> GetTop(int n)
        {
            //Genera una lista de mediciones vacia y un elemento individual
            List<RegistroDatos> listaRegistros = new List<RegistroDatos>();
            RegistroDatos registroItem = new RegistroDatos();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "SELECT * FROM RegistroDatos ORDER BY FechaDato DESC LIMIT @N";
            cmd.Parameters.AddWithValue("@N", n);

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    //Genera un nuevo item y lo llena con el renglon leido del query
                    registroItem = new RegistroDatos();
                    registroItem.IdRegistro = Convert.ToInt32(reader["IdRegistro"]);
                    registroItem.ValorDato = Convert.ToDouble(reader["ValorDato"]);
                    registroItem.FechaDato = Convert.ToDateTime(reader["FechaDato"]);
                    //Agrega el Item leido a la lista
                    listaRegistros.Add(registroItem);
                }
            }

            //----- Finaliza conexión
            conexion.Close();

            return listaRegistros;
        }

        // ------------------------------------------------------------------------------------

        // POST sensores/values
        [HttpPost]
        public void Post([FromBody] RegistroDatos registroItem)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY INSERT ---------------------------------------            
            cmd.CommandText = "INSERT INTO RegistroDatos(ValorDato, FechaDato) VALUES(@VALOR,NOW());";
            // cmd.CommandText = "INSERT INTO RegistroDatos(ValorDato, FechaDato) VALUES(@VALOR,@FECHAMEDICION);";
            //cmd.CommandText = "INSERT INTO RegistroDatos(ValorDato, FechaDato) VALUES(@VALOR,@FECHAMEDICION);";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@VALOR", registroItem.ValorDato);
            // cmd.Parameters.AddWithValue("@FECHAMEDICION", DateTime.Now);
            //cmd.Parameters.AddWithValue("@FECHAMEDICION", registroItem.FechaDato);

            //----- Prepara y ejecuta el INSERT (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            //----- Finaliza la conexion
            conexion.Close();
        }

    }
}

