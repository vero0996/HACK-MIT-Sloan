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
    public class AlarmasController : Controller
    {
        //String de conexión, ajustarla a su instancia de MySql
        private string connectionString = "Server=127.0.0.1;Port=3306;Database=bdSensores;Uid=root;password=rootroot;";
        
        // GET: alarmas/values
        [HttpGet]
        public List<Alarmas> Get()
        {
            //Genera una lista de mediciones vacia y un elemento individual
            List<Alarmas> listaAlarmas = new List<Alarmas>();
            Alarmas alarmaItem = new Alarmas();

            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //----- query SELECT para traer datos
            cmd.CommandText = "Select * from Alarmas";

            //----- Ejecuta el SELECT (ExecuteReader) Itera los resultados del query           
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    //Genera un nuevo item y lo llena con el renglon leido del query
                    alarmaItem = new Alarmas();
                    alarmaItem.IdAlarma = Convert.ToInt32(reader["IdAlarma"]);
                    alarmaItem.ValorRegistrado = Convert.ToDouble(reader["ValorRegistrado"]);
                    alarmaItem.FechaAlarma = Convert.ToDateTime(reader["FechaAlarma"]);
                    //Agrega el Item leido a la lista
                    listaAlarmas.Add(alarmaItem);
                }
            }

            //----- Finaliza conexión
            conexion.Close();

            return listaAlarmas;
        }

        // POST alarmas/value
        [HttpPost]
        public void PostAlarma([FromBody] Alarmas alarmaItem)
        {
            //---- CONFIGURACIÓN DE CONEXIÓN A LA BD -----------------
            MySqlConnection conexion = new MySqlConnection(connectionString);
            conexion.Open();
            MySqlCommand cmd = new MySqlCommand();
            cmd.Connection = conexion;
            //--------------------------------------------------------

            //--- QUERY INSERT ---------------------------------------            
            cmd.CommandText = "INSERT INTO Alarmas(ValorRegistrado, FechaAlarma) VALUES(@VALOR,NOW());";

            //---- PARAMETROS DEL QUERY -----------------------------
            cmd.Parameters.AddWithValue("@VALOR", alarmaItem.ValorRegistrado);

            //----- Prepara y ejecuta el INSERT (ExecuteNonQuery)
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            //----- Finaliza la conexion
            conexion.Close();
        }

    }
}

