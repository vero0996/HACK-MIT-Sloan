using System;
namespace APISensores.Model
{
	public class Alarmas
	{
		public int IdAlarma { get; set;}
        public double ValorRegistrado { get; set; }
        public DateTime FechaAlarma { get; set; }

        public Alarmas()
		{
		}
	}
}

