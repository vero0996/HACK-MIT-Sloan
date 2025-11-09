using System;

namespace API.Model
{
    public class Activities
    {
        // Corresponds to IdActivity (Primary Key)
        public int IdActivity { get; set; }

        // Corresponds to IdUser (Foreign Key to User)
        public int IdUser { get; set; }

        // Corresponds to IdLead (Foreign Key to Leads)
        // This is a nullable int (int?) because the
        // database column allows NULL.
        public int? IdLead { get; set; }

        // Corresponds to Description
        public string? Description { get; set; }

        // Corresponds to Category (e.g., "voice", "call", "auto")
        public string? Category { get; set; }

        // Corresponds to Created_At
        public DateTime Created_At { get; set; }

        // Empty constructor, matching the pattern from Leads.cs
        public Activities()
        {
        }
    }
}