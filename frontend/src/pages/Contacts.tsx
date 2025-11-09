// pages/Contacts.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  lastContact: string;
  source: string;
}

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Sarah Chen', company: 'TechCorp Inc', email: 'sarah@techcorp.com', phone: '+1-555-0123', lastContact: '2 min ago', source: 'voice' },
    { id: '2', name: 'Mike Rodriguez', company: 'StartupXYZ', email: 'mike@startupxyz.com', phone: '+1-555-0124', lastContact: '15 min ago', source: 'call' },
    { id: '3', name: 'Jennifer Lee', company: 'InnovateCo', email: 'jennifer@innovateco.com', phone: '+1-555-0125', lastContact: '1 hour ago', source: 'email' },
    { id: '4', name: 'Alex Thompson', company: 'Global Solutions', email: 'alex@globalsolutions.com', phone: '+1-555-0126', lastContact: '2 hours ago', source: 'voice' },
    { id: '5', name: 'Maria Garcia', company: 'Tech Innovators', email: 'maria@techinnovators.com', phone: '+1-555-0127', lastContact: '1 day ago', source: 'call' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const exportContacts = () => {
    alert('Exporting contacts to CSV...');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 w-full">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900">VoiceCRM</span>
                  <span className="text-xs text-blue-600 font-medium ml-2 bg-blue-50 px-2 py-1 rounded">Zero-Click</span>
                </div>
              </div>
              <nav className="hidden md:ml-8 md:flex space-x-1">
                <button onClick={() => navigate('/dashboard')} className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">Dashboard</button>
                <button onClick={() => navigate('/contacts')} className="text-slate-700 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">Contacts</button>
                <button onClick={() => navigate('/recordings')} className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">Recordings</button>
                <button onClick={() => navigate('/settings')} className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">Settings</button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                Add Contact
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Contacts</h1>
          <p className="text-slate-600">{contacts.length} contacts auto-created from voice conversations</p>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex-1 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={exportContacts}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium"
              >
                Export
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                Add Contact
              </button>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm mr-3">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{contact.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{contact.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{contact.email}</div>
                      <div className="text-sm text-slate-500">{contact.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{contact.lastContact}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        contact.source === 'voice' ? 'bg-green-100 text-green-800' :
                        contact.source === 'call' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {contact.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => alert(`Viewing details for ${contact.name}`)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => deleteContact(contact.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No contacts found</div>
            <div className="text-slate-500 text-sm mt-2">Try adjusting your search terms</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Contacts;