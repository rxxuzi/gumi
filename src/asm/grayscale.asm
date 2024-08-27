; ==============================;
; grayscale.asm                 ;
; for 64bit windows             ;
; ==============================;
section .text
global grayscale_asm

grayscale_asm:
    ; RCX: pointer to image data
    ; RDX: number of pixels (width * height)
    ; R8:  number of channels

    push rbx        ; Save callee-saved registers
    push rsi
    push rdi

    mov rsi, rcx    ; RSI: pointer to image data
    mov rdi, rdx    ; RDI: number of pixels
    xor rbx, rbx    ; RBX: loop counter

.loop:
    xor eax, eax    ; Clear EAX for sum
    mov ecx, 3      ; Counter for RGB channels

.channel_loop:
    movzx edx, byte [rsi]
    add eax, edx
    inc rsi
    loop .channel_loop

    ; Divide by 3 to get average
    xor edx, edx    ; Clear EDX for division
    mov ecx, 3
    div ecx         ; Result in AL

    ; Write grayscale value back to all channels
    mov ecx, 3
    sub rsi, 3      ; Move pointer back to start of pixel

.write_loop:
    mov [rsi], al
    inc rsi
    loop .write_loop

    ; If 4 channels (RGBA), skip alpha
    cmp r8, 4
    jne .next_pixel
    inc rsi

.next_pixel:
    inc rbx
    cmp rbx, rdi
    jl .loop

    pop rdi         ; Restore callee-saved registers
    pop rsi
    pop rbx
    ret