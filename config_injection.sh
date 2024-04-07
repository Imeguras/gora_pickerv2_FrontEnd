#!/bin/bash

_INJECTION_TEXT="export const config={ \
	apiURL: '$FRONTEND_API_URL', \
	apiDomain: '$FRONTEND_API_DOMAIN' \
}"

echo "$_INJECTION_TEXT" > ./src/gora_config.ts