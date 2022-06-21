#!/bin/bash

set -u -e

set +u
environment_variables=$@
environment_variables_slice_length=${#@}
i=0
file_path=$GENERATE_ENV_PATH
set -u

if [[ ! $file_path ]]; then
    file_path=".env.production"
fi

if [[ $environment_variables_slice_length -eq 0 ]]; then
    printf "error: Please provide some environment variables"
    exit 1
fi

for environment_variable in ${environment_variables[@]}; do
    if [[ i -eq 0 ]]; then
        printf "%s\n" $environment_variable > $file_path
    else 
        printf "%s\n" $environment_variable >> $file_path
    fi
    
    i=$((i + 1))
done

printf "file created at: %s\n" ${file_path} 