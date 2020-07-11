# Ziggo Connectbox Arris TG2492LG API

This service exposes the internal data of the modem/router through a JSON API.
The service is started on port `3000`.

## Configuration

The API is configured using environment variables

| Variable | Description | Required |
|---|---|---|
| `HOST` | The IP address where the connectbox is runnning | No. Defaults to `192.168.178.1` |
| `PASSWORD` | The password used to login to the connectbox | Yes |

## Endpoints

From the root endpoint `/` all implemented endpoints can be viewed.

## Getting more data

Using an `SID` and `token` you can loop over all potential modem endpoints.
This can be used to create more JSON endpoints.
This API currently has not implemented all of them.

## Docker

This service is also available on Docker Hub. https://hub.docker.com/r/rogierslag/ziggo-connectbox-arris-tg2492lg
