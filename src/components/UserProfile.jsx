import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../Services/authService';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Shield, LogOut, MapPin, Phone, Edit2, Check, X } from 'lucide-react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getAddressByUserId, saveAddress, hasAddress } from '../data/address';

// Define custom marker icon to ensure visibility
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map click events
const LocationMarker = ({ position, setPosition, setAddress }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setAddress((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>Your selected location</Popup>
    </Marker>
  );
};

const UserProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // State for phone number editing
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');

  // State for address and map coordinates (removed phone from here)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: 'Karnataka',
    postalCode: '',
    latitude: 18.9217, // Default: Mumbai
    longitude: 72.8342,
  });
  const [position, setPosition] = useState([18.9217, 72.8342]); // Default map position
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressLoaded, setAddressLoaded] = useState(false);

  // Load user's saved data when component mounts
  useEffect(() => {
    if (user && !addressLoaded) {
      const savedAddress = getAddressByUserId(user.uid);
      
      // Set phone number from saved address or auth data
      const userPhone = savedAddress?.phone || user.phoneNumber || '';
      setPhoneNumber(userPhone);
      
      if (savedAddress) {
        // Set address data (excluding phone since it's now in profile section)
        setAddress({
          street: savedAddress.street || '',
          city: savedAddress.city || '',
          state: savedAddress.state || 'Karnataka',
          postalCode: savedAddress.postalCode || '',
          latitude: savedAddress.latitude || 18.9217,
          longitude: savedAddress.longitude || 72.8342,
        });
        setPosition([savedAddress.latitude, savedAddress.longitude]);
      }
      setAddressLoaded(true);
    }
  }, [user, addressLoaded]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneEdit = () => {
    setTempPhoneNumber(phoneNumber);
    setIsEditingPhone(true);
  };

  const handlePhoneSave = () => {
    setPhoneNumber(tempPhoneNumber);
    setIsEditingPhone(false);
    
    // Update the saved address with new phone number
    if (user && hasAddress(user.uid)) {
      const savedAddress = getAddressByUserId(user.uid);
      const updatedAddress = {
        ...savedAddress,
        phone: tempPhoneNumber
      };
      saveAddress(user.uid, updatedAddress);
    } else if (user) {
      // If no address exists but user wants to save phone, create a minimal address record
      const minimalAddress = {
        ...address,
        phone: tempPhoneNumber
      };
      saveAddress(user.uid, minimalAddress);
    }
  };

  const handlePhoneCancel = () => {
    setTempPhoneNumber('');
    setIsEditingPhone(false);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    
    // Include the current phone number when saving address
    const addressToSave = {
      ...address,
      phone: phoneNumber
    };
    
    const success = saveAddress(user.uid, addressToSave);
    
    if (success) {
      console.log('Address saved successfully:', addressToSave);
      setIsEditingAddress(false);
    } else {
      console.error('Failed to save address');
    }
  };

  const userHasAddress = user ? hasAddress(user.uid) : false;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-soft-pink flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please log in to view your profile</p>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-soft-pink py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-400 to-red-500 px-6 py-8">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-red-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {user.displayName || 'User Profile'}
                  </h1>
                  <p className="text-red-100">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/*
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-red-400" />
                    <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="text-gray-800">{user.email}</p>
                    </div>
                    </div>*/ 
                  }

                  {user.displayName && (
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Display Name</p>
                        <p className="text-gray-800">{user.displayName}</p>
                      </div>
                    </div>
                  )}
                  {/* Editable Phone Number */}
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-red-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      {isEditingPhone ? (
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="tel"
                            value={tempPhoneNumber}
                            onChange={(e) => setTempPhoneNumber(e.target.value)}
                            placeholder="+91 9876543210"
                            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-red-400 text-sm"
                          />
                          <button
                            onClick={handlePhoneSave}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handlePhoneCancel}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-gray-800">{phoneNumber || 'Not provided'}</p>
                          <button
                            onClick={handlePhoneEdit}
                            className="p-1 text-gray-500 hover:text-red-400"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">User ID</p>
                      <p className="text-gray-800 font-mono text-sm">{user.uid}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email Verification</p>
                      <p className={`font-medium ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                        {user.emailVerified ? 'Verified' : 'Not Verified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account Created</p>
                      <p className="text-gray-800">
                        {new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Sign In</p>
                      <p className="text-gray-800">
                        {new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/orders')}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View Orders
                </button>
                <button 
                  onClick={() => navigate('/wishlist')}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  My Wishlist
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Address Section */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Your Address</h2>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
                >
                  {isEditingAddress ? 'Cancel' : userHasAddress ? 'Edit Address' : 'Add Address'}
                </button>
              </div>

              {isEditingAddress ? (
                <div className="space-y-6">
                  {/* Instructions */}
                  <p className="text-gray-600 text-sm">
                    Click on the map to set your location, then fill in the address details below.
                  </p>

                  {/* Address Form (removed phone field) */}
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Street Address</label>
                        <input
                          type="text"
                          name="street"
                          value={address.street}
                          onChange={handleAddressChange}
                          placeholder="Enter street address"
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          placeholder="Enter city"
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleAddressChange}
                          placeholder="Enter state"
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={address.postalCode}
                          onChange={handleAddressChange}
                          placeholder="Enter postal code"
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Latitude</label>
                        <input
                          type="number"
                          step="any"
                          value={address.latitude}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Longitude</label>
                        <input
                          type="number"
                          step="any"
                          value={address.longitude}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>

                    {/* Map */}
                    <div className="h-64 rounded-lg overflow-hidden">
                      <MapContainer 
                        center={position} 
                        zoom={15} 
                        style={{ height: '100%', width: '100%' }}
                        key={`${position[0]}-${position[1]}`}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                      </MapContainer>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors font-semibold"
                    >
                      Save Address
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Display Address */}
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Saved Address</p>
                      {userHasAddress ? (
                        <div>
                          <p className="text-gray-800 font-semibold">
                            {address.street}
                          </p>
                          <p className="text-gray-700">
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Coordinates: {address.latitude?.toFixed(4)}, {address.longitude?.toFixed(4)}
                          </p>
                          {getAddressByUserId(user.uid)?.lastUpdated && (
                            <p className="text-xs text-gray-500 mt-1">
                              Last updated: {getAddressByUserId(user.uid).lastUpdated}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-600 italic">No address saved yet</p>
                          <p className="text-sm text-gray-500">Click "Add Address" to save your delivery location</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Map */}
                  <div className="h-64 rounded-lg overflow-hidden">
                      <MapContainer
                        center={position}
                        zoom={15}
                        style={{ height: '100%', width: '100%', zIndex: 0 }}
                        key={`${position[0]}-${position[1]}`}
                      >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {userHasAddress && (
                        <Marker position={position} icon={customIcon}>
                          <Popup>Your saved location</Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>

                  {/* Address Status Message */}
                  {!userHasAddress && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 font-medium">
                        💡 Add your delivery address to make future orders faster!
                      </p>
                      <p className="text-blue-600 text-sm mt-1">
                        Your saved address will be automatically used for cake deliveries.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;