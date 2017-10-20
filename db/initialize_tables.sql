CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100),
  date_created TIMESTAMP WITH TIME ZONE DEFAULT now()
)

CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500),
  description TEXT,
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(2),
  zip VARCHAR(5),
  url TEXT,
  mortgage_total NUMERIC,
  mortgage_monthly NUMERIC,
  desired_rent NUMERIC,
  user_id INTEGER REFERENCES users(id),
  date_created TIMESTAMP WITH TIME ZONE DEFAULT now()
)
