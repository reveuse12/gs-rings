import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const MyTransactions = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ifremId, setifremId] = useState(localStorage.getItem('iframe_id'));
  const [username, setusername] = useState(localStorage.getItem('name'));
  const [retailerType, setRetailerType] = useState(localStorage.getItem('role'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    item: '',
    id: '',
    date: '',
    price: '',
    status: ''
  });

  const handleRetailerTypeChange = async (e) => {
    const userId = localStorage.getItem('userId');
    setRetailerType(e.target.value);
    localStorage.setItem('role', e.target.value);
    if (userId) {
      try {
        const updatedUserData = {
          email: localStorage.getItem('email'),
          name: localStorage.getItem('name'), 
          brevo_id: localStorage.getItem('brevo_id'),
          brevo_key: localStorage.getItem('brevo_key'),
          email_send_from_brevo: localStorage.getItem('email_send_from_brevo'),
          role: e.target.value // Update role based on selected retailer type
        };

        // Update user data
        const updateResponse = await fetch(`https://amgdynamics.horizonbeam.com/update-user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserData),
        });

        if (!updateResponse.ok) {
          Swal.fire('Error', 'Failed to update user', 'error'); // Show error alert
        }
      } catch (err) {
        Swal.fire('Error', err.message, 'error'); // Show error alert
      }
    }
    
  };
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Check if user is logged in by checking localStorage
        const userId = localStorage.getItem('userId');
        const brevoId = localStorage.getItem('brevo_id');
        const brevoKey = localStorage.getItem('brevo_key');
        const iframe_id = localStorage.getItem('iframe_id');
        const role = localStorage.getItem('role');
        setRetailerType(role);
        if(iframe_id){
          setifremId(iframe_id);
        }
        if (!userId || !brevoId || !brevoKey) {
          // Redirect to login if not logged in
          navigate('/');
          return;
        }
        console.log(userId);
        // Fetch transactions for the user
        const transactionsResponse = await fetch(userId === 'admin' 
          ? 'https://amgdynamics.horizonbeam.com/admin/get-all-transactions'
          : `https://amgdynamics.horizonbeam.com/get-transactions/${userId}`);
        if (!transactionsResponse.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const transactionsData = await transactionsResponse.json();
        setTransactions(Array.isArray(transactionsData.transactions) ? transactionsData.transactions : []);
      } catch (err) {
        setError("No Transaction Found");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);
  useEffect(() => {
      setgetemail(localStorage.getItem('email'));
      setgetname(localStorage.getItem('name'));
      setusername(localStorage.getItem('name'));
      setBrevoId(localStorage.getItem('brevo_id'));
      setBrevoKey(localStorage.getItem('brevo_key'));
      setEmailSendFromBrevo(localStorage.getItem('email_send_from_brevo'));
      setRetailerType(localStorage.getItem('role'));
  }, [activeTab]);

  // Add state variables for form fields
  const [getemail, setgetemail] = useState('');
  const [getname, setgetname] = useState('');
  const [brevoId, setBrevoId] = useState('');
  const [brevoKey, setBrevoKey] = useState('');
  const [emailSendFromBrevo, setEmailSendFromBrevo] = useState('');
  const labels = ([
    { key: 'ringStyle', value: 'Ring Style and Design' },
    { key: 'sideStoneSize', value: 'Side Stone Size' },
    { key: 'sideStoneLength', value: 'Side Stone Length' },
    { key: 'centerStoneShape', value: 'Center Stone Shape' },
    { key: 'centerStoneSize', value: 'Center Stone Size' },
    { key: 'setting', value: 'SETTING' },
    { key: 'metal', value: 'METAL' },
    { key: 'centerStoneType', value: 'Center Stone Type' },
    { key: 'sideStoneType', value: 'Side Stone Type' },
    { key: 'price', value: 'Price' },
    { key: 'item', value: 'Item' }
  ]);
  useEffect(() => {
    const role = localStorage.getItem('role');
    console.log(role);
    setRetailerType(role);
  }, []);

  const renderSearchHeader = (column, type = 'text') => (
    <th className="p-4 w-1/6 align-top">
      {column}
      {type === 'select' ? (
        <select
          onChange={(e) => {
            setFilters(prev => ({
              ...prev,
              [column.toLowerCase()]: e.target.value.toLowerCase()
            }));
          }}
          className="mt-2 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Status</option>
          <option value="Order confirmed">Order confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Accept">Accept</option>
        </select>
      ) : (
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setFilters(prev => ({
              ...prev,
              [column.toLowerCase()]: e.target.value.toLowerCase()
            }));
          }}
          className="mt-2 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      )}
    </th>
  );

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      return (
        (!filters.item || transaction.particular?.item.toLowerCase().includes(filters.item)) &&
        (!filters.id || transaction.id.toString().includes(filters.id)) &&
        (!filters.date || transaction.date.toLowerCase().includes(filters.date)) &&
        (!filters.price || transaction.particular?.price.toString().includes(filters.price)) &&
        (!filters.status || transaction.status.toLowerCase().includes(filters.status))
      );
    });
  };

  return (
    <div className="flex h-screen">
      {/* Header */}
      <header className="flex items-center justify-between bg-white border-b border-gray-200 text-gray-800 p-4 w-full fixed top-0">
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-10 mr-2"/>
          <span className="text-lg font-bold">My Account</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <i className="fas fa-user-circle text-xl mr-2"></i>
            <span>{username}</span>
          </div>
          <div className="md:hidden">
            <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`w-64 bg-white text-gray-800 border-r border-gray-200 pt-16 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className='p-4'>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'transactions' ? 'bg-purple-700 text-white' : 'hover:bg-purple-100'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('brevo')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'brevo' ? 'bg-purple-700 text-white' : 'hover:bg-purple-100'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab('iframe')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'iframe' ? 'bg-purple-700 text-white' : 'hover:bg-purple-100 '
            }`}
          >
            Iframe
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Button */}
      

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pt-16">
          
          {activeTab === 'brevo' ? (
            <div className='w-full setActiveTab-content'>
              <h2 className="text-2xl font-bold mb-4 border-b p-4">General Settings</h2>
              <div className="bg-white p-4 rounded" style={{ maxWidth: '500px' }}>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const userId = localStorage.getItem('userId');
                  const name = e.target.name.value;
                  const brevoId = e.target.brevoId.value;
                  const brevoKey = e.target.brevoKey.value;
                  const emailSendFromBrevo = e.target.emailSendFromBrevo.value;
                  const subject = 'Updated Brevo Key Notification';
                  const htmlContent = `
                    <html>
                      <head></head>
                      <body>
                        <p>Hello ${brevoId},</p>
                        <p>Your Brevo key has been updated successfully.</p>
                        <p>Thank you for updating your Brevo key with GS Ring and Band Configurator.</p>
                      </body>
                    </html>
                  `;
                  await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                      'accept': 'application/json',
                      'api-key': brevoKey,
                      'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                      sender: {
                        name: brevoId,
                        email: emailSendFromBrevo
                      },
                      to: [
                        {
                          email: emailSendFromBrevo,
                          name: brevoId
                        }
                      ],
                      subject: subject,
                      htmlContent: htmlContent
                    })
                  })
                  .then(async (response) => {
                    if (!response.ok) {
                      const errorData = await response.json();
                      Swal.fire('Error', 'Invalid Email Send From Brevo or Brevo Key', 'error');
                      setIsSubmitting(false);
                      throw new Error('Invalid Brevo API key');
                    }
                    return response.json();
                  })
                  const response = await fetch(`https://amgdynamics.horizonbeam.com/update-user/${userId}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: localStorage.getItem('email'),
                      name: localStorage.getItem('name'),
                      brevo_id: brevoId,
                      brevo_key: brevoKey,
                      email_send_from_brevo: emailSendFromBrevo,
                      role: localStorage.getItem('role'),
                    }),
                  });

                  if (!response.ok) {
                    Swal.fire('Error', 'Failed to update user', 'error');
                  } else {
                    Swal.fire('Success', 'User updated successfully', 'success');
                    localStorage.setItem('brevo_id', brevoId);
                    setBrevoId(brevoId);
                    localStorage.setItem('brevo_key', brevoKey);   
                    setBrevoKey(brevoKey);
                    localStorage.setItem('email_send_from_brevo', emailSendFromBrevo);
                    setEmailSendFromBrevo(emailSendFromBrevo);
                  }
                  setIsSubmitting(false);
                }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Brevo Sender Name:</label>
                    <input 
                      type="text" 
                      name="brevoId" 
                      value={brevoId} 
                      onChange={(e) => setBrevoId(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Brevo Key:</label>
                    <input 
                      type="password" 
                      name="brevoKey" 
                      value={brevoKey} 
                      onChange={(e) => setBrevoKey(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email Send From Brevo:</label>
                    <input 
                      type="email" 
                      name="emailSendFromBrevo" 
                      value={emailSendFromBrevo} 
                      onChange={(e) => setEmailSendFromBrevo(e.target.value)} 
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      required 
                    />
                  </div>
                  <div className="flex justify-start">
                    <button 
                      type="submit" 
                      className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ):(
            <></>
          )}
          {activeTab === 'iframe' ? (
            <div className='w-ful setActiveTab-content'>
              <div className="iframe-content">
                <h2 className="text-2xl font-bold mb-4 border-b p-4">Iframe Content</h2>
                <div className="input-group bg-white p-8 rounded-lg">
                    <div 
                      className="bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                      onClick={() => {
                        const iframeCode = `<iframe src="${window.location.origin}?token=${ifremId}" style="width: 100%; height: 100vh; border: none;"></iframe>`;
                        navigator.clipboard.writeText(iframeCode).then(() => {
                          document.getElementById('show-message').textContent = 'Iframe code copied to clipboard';
                          document.getElementById('show-message').style.color = '#9333EA'; // Purple color
                          setTimeout(() => {
                            document.getElementById('show-message').textContent = '';
                          }, 2000);
                        }).catch(err => {
                          console.error('Failed to copy iframe code: ', err);
                        });
                      }}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <label className="text-lg font-semibold tracking-wide">{ifremId}</label>
                      </div>
                      <div className="mt-2 bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-800 py-2 text-center text-sm font-medium">
                        Click to copy iframe code
                      </div>
                    </div>
                    <span id="show-message" className="block mt-4 text-center font-medium animate-fade-in"></span>
                </div>
              </div>
            </div>
          ) : ( 
            <></>
          )}
          {activeTab === 'transactions' ? (
            <div className='w-full setActiveTab-content'>
              <div className="transactions-list ">
                <h2 className="text-2xl font-bold mb-4 border-b p-4">Transactions</h2>
                {loading ? (
                  <div className="loading">Loading transactions...</div>
                ) : error ? (
                  <div className="error">{error}</div>
                ) : transactions.length === 0 ? (
                  <p>No transactions found.</p>
                ) : (
                  <>
                    <div className="bg-white p-4 rounded">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-100 font-medium text-left">
                            <th className="p-4 w-1/6 align-top">Image</th>
                            {renderSearchHeader('Item')}
                            {renderSearchHeader('ID')}
                            {renderSearchHeader('Date')}
                            {renderSearchHeader('Price')}
                            {renderSearchHeader('Status', 'select')}
                            <th className="p-4 w-1/6 align-top">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredTransactions().map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                              <td className="p-4">
                                {transaction.images && transaction.images[0] && (
                                  <div 
                                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                                    onClick={() => {
                                      const modal = document.createElement('div');
                                      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                                      modal.onclick = () => document.body.removeChild(modal);
                                      
                                      const img = document.createElement('img');
                                      img.src = transaction.images[0].file_url;
                                      img.className = 'max-w-[90%] max-h-[90vh] object-contain';
                                      
                                      modal.appendChild(img);
                                      document.body.appendChild(modal);
                                    }}
                                  >
                                    <img
                                      src={transaction.images[0].file_url}
                                      alt="Transaction"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                              </td>
                              <td className="p-4">
                                <p className="text-sm font-medium">{transaction.particular?.item}</p>
                              </td>
                              <td className="p-4 text-center">
                                <p className="text-sm text-gray-500">#{transaction.id}</p>
                              </td>
                              <td className="p-4 text-center">
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                              </td>
                              <td className="p-4 text-center">
                                <p className="text-sm font-medium">${transaction.particular?.price}</p>
                              </td>
                              <td className="p-4 text-center">
                                <div className={`px-3 py-1 rounded-full text-xs inline-block ${
                                  transaction.status === 'Order confirmed' ? 'bg-green-100 text-green-800' :
                                  transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {transaction.status}
                                </div>
                              </td>
                              <td className="p-4 text-center flex flex-wrap gap-2">
                                {(transaction.status !== 'Order confirmed' || localStorage.getItem('userId') === 'admin') && transaction.status !== 'Accepted' ? (
                                  <button 
                                  className="text-sm  next-button" 
                                  onClick={async () => {
                                    const confirmed = await Swal.fire({
                                      title: 'Are you sure?',
                                      text: "Do you want to update this order?",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonText: 'Yes, update it!',
                                      cancelButtonText: 'No, cancel!',
                                    });

                                    if (confirmed.isConfirmed) {
                                      try {
                                        const userId = localStorage.getItem('userId');
                                        const response = await fetch(userId === 'admin' 
                                          ? `https://amgdynamics.horizonbeam.com/admin/update-transaction-status/${transaction.id}`
                                          : `https://amgdynamics.horizonbeam.com/update-transaction-status/${transaction.id}`, {
                                          method: 'PUT',
                                          headers: {
                                            'Content-Type': 'application/json',
                                          },
                                        });

                                        if (!response.ok) {
                                          throw new Error('Failed to update transaction status');
                                        }

                                        // Show success message
                                        Swal.fire('Success', 'Order confirmed successfully', 'success').then(() => {
                                          window.location.reload();
                                        });
                                      } catch (error) {
                                        Swal.fire('Error', error.message, 'error');
                                      }
                                    }
                                  }}
                                >
                                  Actions
                                </button>
                                ) : (
                                  <></>
                                )}
                              <button 
                                className="text-sm  next-button" 
                                onClick={async () => {
                                  const detailPopup = document.getElementById(`detailPopup${transaction.id}`);
                                  detailPopup.style.display = 'flex';
                                }}
                              >
                                See Details
                              </button>
                              <div id={`detailPopup${transaction.id}`} className="popup-overlay" style={{ display: 'none' }}>
                                <div className="popup-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', overflow: 'hidden' }}>
                                  <button className="close-btn" onClick={() => document.getElementById(`detailPopup${transaction.id}`).style.display = 'none'}>
                                    <i className="fas fa-times"></i>
                                  </button>
                                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Transaction Details</h2>
                                  <div className="flex flex-row justify-between bg-white rounded-lg p-4">
                                    <div className="w-1/2">
                                      {transaction.images[0] && (
                                        <img src={transaction.images[0].file_url} alt="Screenshot 1" className="w-full rounded-lg" />
                                      )}
                                      {transaction.images[1] && (
                                        <img src={transaction.images[1].file_url} alt="Screenshot 2" className="w-full mt-4 rounded-lg" />
                                      )}
                                    </div>
                                    <div className="w-1/2 pl-4">
                                      <h2 className="w-full text-left text-xl font-bold mb-4">Transaction Information</h2>
                                      <div className="flex flex-col">
                                        {Object.keys(transaction.particular).map((key, index) => (
                                          <div key={index} className="flex flex-row mb-2">
                                            <strong className="text-left w-1/2 text-gray-700">{labels.find(label => label.key === key)?.value || key} </strong>
                                            <span className="text-left w-1/2 text-gray-900">{transaction.particular[key]}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
            </div>
          </div>
        ):(
          <></>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;