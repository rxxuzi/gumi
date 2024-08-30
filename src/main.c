#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <getopt.h>
#include "gumi.h"

void print_usage() {
    printf("Usage: gumi <command> <input_file> [<input_file2>] [-o <output_file>] [-f <format>]\n");
    printf("Commands:\n");
    printf("  gray    - Convert to grayscale\n");
    printf("  binary  - Convert to binary\n");
    printf("Formats:\n");
    printf("  png, jpg, bmp\n");
}

ImageFormat parse_format(const char *format_str) {
    if (strcasecmp(format_str, "png") == 0) return PNG;
    if (strcasecmp(format_str, "jpg") == 0 || strcasecmp(format_str, "jpeg") == 0) return JPEG;
    if (strcasecmp(format_str, "bmp") == 0) return BMP;
    return PNG;
}

char* get_base_name(const char* filename) {
    char* base = strdup(filename);
    char* dot = strrchr(base, '.');
    if (dot) {
        *dot = '\0';
    }
    return base;
}

int main(int argc, char **argv) {
    if (argc < 3) {
        print_usage();
        return 1;
    }

    const char *command = argv[1];
    const char *input_file = argv[2];
    char *output_file = NULL;
    ImageFormat format = PNG;
    ProcessType type;

    int opt;
    while ((opt = getopt(argc - 2, argv + 2, "o:f:")) != -1) {
        switch (opt) {
            case 'o':
                output_file = optarg;
                break;
            case 'f':
                format = parse_format(optarg);
                break;
            default:
                print_usage();
                return 1;
        }
    }

    if (strcmp(command, "gray") == 0) {
        type = G_GRAY;
    } else if (strcmp(command, "binary") == 0) {
        type = G_BINARY;
    } else {
        printf("Unknown command: %s\n", command);
        print_usage();
        return 1;
    }

    if (!output_file) {
        char* base_name = get_base_name(input_file);
        output_file = malloc(strlen(base_name) + strlen(command) + 6);
        if (output_file == NULL) {
            printf("Memory allocation failed.\n");
            free(base_name);
            return 1;
        }
        sprintf(output_file, "%s-%s.%s", base_name, command, format == JPEG ? "jpg" : (format == BMP ? "bmp" : "png"));
        free(base_name);
    }

    int result;
    result = process_with_format(input_file, output_file, type, format);

    free(output_file);

    return result;
}