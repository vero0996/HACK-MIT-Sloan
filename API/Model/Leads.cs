using System;
namespace API.Model
{
	public class Leads
	{
		public int IdLead { get; set;}
        public int IdUser { get; set; }
        public string? Company { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Status { get; set; }
        public string? LeadSource { get; set; }
        public string? Priority { get; set; }
		public DateTime Created_At { get; set; }
		public DateTime Updated_At { get; set; }
        public DateTime Last_Contact_Date { get; set; }
        public DateTime Next_Follow_Up_Date { get; set; }
        public Leads()
		{
		}
	}
}

