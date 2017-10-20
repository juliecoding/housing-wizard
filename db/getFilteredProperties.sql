SELECT *
FROM properties
WHERE user_id = $1
AND desired_rent = $2
