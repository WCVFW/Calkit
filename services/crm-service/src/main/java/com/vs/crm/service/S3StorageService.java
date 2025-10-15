package com.vs.crm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.net.URI;
import java.time.Duration;

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
        var creds = StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey));
        S3Presigner.Builder builder = S3Presigner.builder().credentialsProvider(creds).region(Region.of(region));
        if (endpoint != null && !endpoint.isBlank()) {
            builder = builder.endpointOverride(URI.create(endpoint));
        }
        this.presigner = builder.build();
    }

    public String presignUpload(String key, String contentType, long contentLength, Duration expires) {
        PutObjectRequest put = PutObjectRequest.builder().bucket(bucket).key(key).contentType(contentType).contentLength(contentLength).build();
        PresignedPutObjectRequest req = presigner.presignPutObject(PutObjectPresignRequest.builder().putObjectRequest(put).signatureDuration(expires).build());
        return req.url().toString();
    }

    public String presignDownload(String key, Duration expires) {
        PresignedGetObjectRequest req = presigner.presignGetObject(GetObjectPresignRequest.builder()
                .signatureDuration(expires)
                .getObjectRequest(b -> b.bucket(bucket).key(key)).build());
        return req.url().toString();
    }
}
