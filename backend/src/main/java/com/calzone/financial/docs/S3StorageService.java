package com.calzone.financial.docs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.net.URI;
import java.time.Duration;

/**
 * AWS S3 Service for generating pre-signed URLs for upload and download.
 * Uses AWS SDK v2 (S3Presigner).
 */
@ConditionalOnProperty(prefix = "aws.s3", name = "bucket")
@Service
public class S3StorageService {

    private final String bucket;
    private final S3Presigner presigner;

    public S3StorageService(
            @Value("${aws.region}") String region,
            @Value("${aws.s3.bucket}") String bucket,
            @Value("${aws.accessKeyId}") String accessKey,
            @Value("${aws.secretAccessKey}") String secretKey,
            @Value("${aws.s3.endpoint:}") String endpoint
    ) {
        this.bucket = bucket;

        var creds = StaticCredentialsProvider.create(
                AwsBasicCredentials.create(accessKey, secretKey)
        );

        S3Presigner.Builder builder = S3Presigner.builder()
                .region(Region.of(region))
                .credentialsProvider(creds);

        // Optional endpoint (for MinIO or custom S3-compatible services)
        if (endpoint != null && !endpoint.isBlank()) {
            builder.endpointOverride(URI.create(endpoint));
        }

        this.presigner = builder.build();
    }

    /**
     * Generate a presigned URL for uploading an object to S3.
     */
    public String presignUpload(String key, String contentType, long contentLength, Duration expires) {
        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(contentType)
                .build();

        PresignedPutObjectRequest presignedRequest = presigner.presignPutObject(
                PutObjectPresignRequest.builder()
                        .putObjectRequest(putRequest)
                        .signatureDuration(expires)
                        .build()
        );

        return presignedRequest.url().toString();
    }

    /**
     * Generate a presigned URL for downloading an object from S3.
     */
    public String presignDownload(String key, Duration expires) {
        GetObjectRequest getRequest = GetObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();

        PresignedGetObjectRequest presignedRequest = presigner.presignGetObject(
                GetObjectPresignRequest.builder()
                        .getObjectRequest(getRequest)
                        .signatureDuration(expires)
                        .build()
        );

        return presignedRequest.url().toString();
    }
}
