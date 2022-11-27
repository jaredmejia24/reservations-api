# Reservations API

## Table of content

- [Prerequisites](#prerequisites)
- [Build](#build)
- [Endpoints](#endpoints)
    -[Notes](#note)
    -[Get all reservations](#get-all-reservation)
    -[Get reservation by id](#get-reservation-by-id)
    -[Create reservation](#create-reservation)
    -[Update reservation](#update-reservation)
    -[Delete reservation](#update-reservation)
    -[Pay reservation](#pay-reservation)

## prerequisites

I assume you have installed Docker and it is running.

See the [Docker website](http://www.docker.io/gettingstarted/#h_installation) for installation instructions.

## Build

Steps to build a Docker image:

1.  Clone this repo

        git clone https://github.com/jaredmejia24/reservations-api.git

2.  Build both images the backend server with the name api_reservations and the PostgreSQL database with the name db_reservations

        docker compose build

    This will take a time.

3.  Run the images. It will automatically run in port 4000

        docker compose up

    If everything works you will see this message in the terminal: express app running in port 4000

4.  Once everything has started up, you should be able to access the webapp via [http://localhost:4000/](http://localhost:4000/) on your host machine.

            try the endpoint http://localhost:4000/api/v1/reservations
            if everything works right you will see a json similar to this:
            {
                "status": "success",
                "data": {
                    "reservations": []
                    }
            }

## Endpoints

### Note

    In all the endpoints that uses an id in the url, if the reservation is not found or it was deleted. The endpoint
    will return an error saying Reservation Not Found

### Get all reservation

    GET http://localhost:4000/api/v1/reservations

    This endpoint will return all the reservations in the database excluding the reservations that has status deleted

### Get reservation by id

    GET http://localhost:4000/api/v1/reservations/:id

    :id needs to be replace with the number of the reservation id

    This endpoint will return the reservation that has the id written in the url

### Create reservation

    POST http://localhost:4000/api/v1/reservations

    This endpoint will create a reservation, if status is sent it will automatically remove it,
    this endpoint will return the created reservation. You will need to send a json similiar to this:

    ```create-reservation-json
    {
    "roomDetails": "A very spacious room with 1 bed and 1 bathroom",
    "stayDays": 2,
    "paymentMethod": "paypal",
    "amountPaid": 125.25,
    "billingInformation": "some billing information",
    "clientId": 1
    }
    ```

### Update reservation

    PATCH http://localhost:4000/api/v1/reservations/:id

    :id needs to be replace with the number of the reservation id

    This endpoint will update a reservation, all properties are optional and will only take
    the values sent, if status is sent it will automatically remove it, this endpoint will
    return the updated reservation. You will need to send a json similiar to this:

    ```update-reservation-json
    {
    "roomDetails": "A very spacious room with 1 bed and 1 bathroom",
    "stayDays": 2,
    "paymentMethod": "paypal",
    "amountPaid": 125.25,
    "billingInformation": "some billing information",
    "clientId": 1
    }
    ```

### Delete reservation

    DELETE http://localhost:4000/api/v1/reservations/:id

    :id needs to be replace with the number of the reservation id

    This endpoint will update the reservation status to deleted (soft delete), this endpoint
    doesn't return anything.

### Pay reservation

    PATCH http://localhost:4000/api/v1/reservations/pay/:id

    :id needs to be replace with the number of the reservation id

    This endpoint will update the reservation status to payed, if the reservation is already
    payed it will send an error, this endpoint will return the updated reservation.
