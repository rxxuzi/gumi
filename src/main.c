#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "gumi.h"

void print_usage() {
    printf("Usage: gumi <command> <input_file> [-o <output_file>]\n");
    printf("Commands:\n");
    printf("  gray    - Convert to grayscale\n");
    printf("  binary  - Convert to binary\n");
}

int main(int argc, char **argv) {
    if (argc < 3) {
        print_usage();
        return 1;
    }

    const char *command = argv[1];
    const char *input_file = argv[2];
    char *output_file = NULL;
    ProcessType type;

    if (strcmp(command, "gray") == 0) {
        type = G_GRAY;
    } else if (strcmp(command, "binary") == 0) {
        type = G_BINARY;
    } else {
        printf("Unknown command: %s\n", command);
        print_usage();
        return 1;
    }

    // Check for -o option
    if (argc >= 5 && strcmp(argv[3], "-o") == 0) {
        output_file = argv[4];
    } else {
        // Generate default output filename
        output_file = malloc(strlen(input_file) + strlen(command) + 2);
        if (output_file == NULL) {
            printf("Memory allocation failed.\n");
            return 1;
        }
        char *dot = strrchr(input_file, '.');
        if (dot != NULL) {
            size_t base_len = dot - input_file;
            strncpy(output_file, input_file, base_len);
            sprintf(output_file + base_len, "-%s%s", command, dot);
        } else {
            sprintf(output_file, "%s-%s", input_file, command);
        }
    }

    int result = process(input_file, output_file, type);

    if (argc < 5) {
        free(output_file);
    }

    return result;
}