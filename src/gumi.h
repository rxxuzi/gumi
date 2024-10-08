#ifndef GUMI_H
#define GUMI_H

// Process types
typedef enum {
    G_CONV = 0x00,
    G_GRAY = 0x01,
    G_BINARY = 0x02,
} ProcessType;

typedef enum {
    PNG,
    JPEG,
    BMP,
} ImageFormat;

int process(const char *input_file, const char *output_file, ProcessType type);
int process_with_format(const char *input_file, const char *output_file, ProcessType type, ImageFormat format);

extern void grayscale_asm(unsigned char *img, int num_pixels, int channels);
extern void binary_asm(unsigned char *img, int num_pixels, int channels);
#endif //GUMI_H