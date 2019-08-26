#starting the fake steady state data service
  cd chaos-qoala-integration-tests
  npm run steadystate

#default port is 7766

#start the test run (assume your machine uses an IP of 192.168.0.85):

  PUT http://192.168.0.85:7766/steadystate/start

#get the results (if there was no prior call to /steadystate/start then error code of 400 will be returned)

  base url is /steadystate/start which then takes 4 url args
  1. baseline - baseline (integer) figure for steady state
  2. lower variance - % as integer
  3. upper variance - % as an integer
  4. results per second - as an integer

  so to get results based on a baseline of 100 with a maximum 50% variance in the lower range 
  and a 10% variance in the upper range, and 10 results per test run second you would use the following:

  GET http://192.168.0.85:7766/steadystate/stop/100/50/10/10/