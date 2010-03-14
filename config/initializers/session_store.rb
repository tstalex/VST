# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_third_session',
  :secret      => 'e067d9c559c9ce9d0df3cf0dfde59396f43c2d19c830caf79bbd7c3e9b5fe30b8736f157f5604f47c0d5ab656fb1e7052d45404eddb235d3db62f06b01567260'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
