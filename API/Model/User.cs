using System;
namespace API.Model
{
	public class User
	{
		public int IdUser { get; set;}
        public string? Username { get; set; }
		public string? Password { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }
        public string? JobTitle { get; set; }
		public DateTime Created_At { get; set; }
		public DateTime Updated_At { get; set; }
        public User()
		{
		}
	}
}

