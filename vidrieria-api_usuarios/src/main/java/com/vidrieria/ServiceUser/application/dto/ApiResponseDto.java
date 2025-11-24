package com.vidrieria.ServiceUser.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDto<T> {
    private int status;
    private boolean success;
    private String message;
    private T data;
}
