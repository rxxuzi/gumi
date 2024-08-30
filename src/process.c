#define STB_IMAGE_IMPLEMENTATION
#include "stb/stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb/stb_image_write.h"
#include "gumi.h"
#include <stdio.h>
#include <stdint.h>


int process_with_format(const char *input_file, const char *output_file, ProcessType type, ImageFormat format) {
    int width, height, channels;
    uint8_t *img = stbi_load(input_file, &width, &height, &channels, 0);
    if (img == NULL) {
        printf("Error in loading the image %s\n", input_file);
        return 1;
    }

    printf("Processing image: %dx%d with %d channels\n", width, height, channels);

    switch (type) {
        case G_GRAY:
            grayscale_asm(img, width * height, channels);
            break;
        case G_BINARY:
            binary_asm(img, width * height, channels);
            break;
        default:
            printf("Unknown processing type\n");
            stbi_image_free(img);
            return 1;
    }

    int result;
    switch (format) {
        case PNG:
            result = stbi_write_png(output_file, width, height, channels, img, width * channels);
            break;
        case JPEG:
            result = stbi_write_jpg(output_file, width, height, channels, img, 95);
            break;
        case BMP:
            result = stbi_write_bmp(output_file, width, height, channels, img);
            break;
        default:
            printf("Unknown output format\n");
            stbi_image_free(img);
            return 1;
    }

    stbi_image_free(img);

    if (result == 0) {
        printf("Error in writing the image %s\n", output_file);
        return 1;
    }

    printf("Processed image saved as %s\n", output_file);
    return 0;
}