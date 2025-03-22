#!/usr/bin/env sh

set -e

root_dir=$(dirname $(dirname $(realpath "$0")))
mediasrc=$1
## Uncomment to create a backup of existing images:
# timestamp=$(date +%Y%m%d_%H%M%S)
# mkdir -p "imgbak${timestamp}"
# mv src/images/* "imgbak${timestamp}"

# TODO perhaps automate export from MacOS Photos via https://rhettbull.github.io/osxphotos/cli.html#osxphotos-export

pushd $mediasrc

if [ -e *.mov ]; then
    mkdir -p handbrake
    for movie in *.mov; do
        HandbrakeCLI --preset "Social 25 MB 1 Minute 720p60" --input ${movie} --output "handbrake/${movie%.mov}.mp4" --optimize
        exiftool -TagsFromFile ${movie} -extractEmbedded -all:all -FileCreateDate -GPSPosition "handbrake/${movie%.mov}.mp4" -overwrite_original
    done

    mv handbrake/* "${root_dir}/src/images"
else
    echo "No movies found."
fi

# mkdir -p imageoptim
# cp -p *.jpeg imageoptim
# printf "%s " "Run ImageOptim on all files in ${mediasrc}/imageoptim, then press Enter"
# read
if [ -e *.jpeg ]; then
    mkdir -p jpegoptim
    jpegoptim --dest=jpegoptim --overwrite --preserve *.jpeg
    mv jpegoptim/* "${root_dir}/src/images"
else
    echo "No images found."
fi

popd
