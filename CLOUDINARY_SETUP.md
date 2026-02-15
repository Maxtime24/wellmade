# Cloudinary 환경 변수 설정 가이드

## 1. Cloudinary 계정 생성

1. [Cloudinary](https://cloudinary.com) 웹사이트 방문
2. "Sign Up for Free" 클릭
3. 무료 계정 생성 (이메일 또는 Google 계정 사용 가능)

## 2. Cloud Name 및 Upload Preset 확인

### Cloud Name 찾기

1. Cloudinary Dashboard 로그인
2. 왼쪽 상단에 표시된 **Cloud Name** 확인
   - 예: `dxyz123abc`

### Upload Preset 생성

1. Dashboard에서 **Settings** (⚙️) 클릭
2. **Upload** 탭 선택
3. 하단의 **Upload presets** 섹션으로 스크롤
4. **Add upload preset** 클릭
5. 다음 설정 적용:
   - **Signing Mode**: `Unsigned` 선택 (중요!)
   - **Preset name**: 원하는 이름 입력 (예: `wellmade_uploads`)
   - **Folder**: 선택사항 (예: `contact_forms`)
6. **Save** 클릭

## 3. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하거나 수정합니다:

```bash
# .env.local 파일에 추가

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

**예시**:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123abc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=wellmade_uploads
```

> [!IMPORTANT]
> - `your_cloud_name`을 실제 Cloud Name으로 교체하세요
> - `your_upload_preset`을 생성한 Upload Preset 이름으로 교체하세요
> - 환경 변수 변경 후 개발 서버를 재시작해야 합니다 (`npm run dev` 중지 후 재실행)

## 4. 개발 서버 재시작

```bash
# 현재 실행 중인 서버 중지 (Ctrl+C)
# 서버 재시작
npm run dev
```

## 5. 테스트

1. `http://localhost:3000/contact` 또는 `http://localhost:3000/about` 접속
2. 문의 양식의 "파일 업로드" 버튼 클릭
3. Cloudinary 업로드 위젯이 열리는지 확인
4. 테스트 파일 업로드
5. 업로드 완료 후 파일명이 표시되는지 확인
6. 양식 작성 후 "문의 보내기" 클릭
7. 메일 본문에 파일 URL이 포함되는지 확인

## 문제 해결

### "Upload preset not found" 오류

- Upload Preset의 Signing Mode가 **Unsigned**로 설정되어 있는지 확인
- Upload Preset 이름이 환경 변수와 정확히 일치하는지 확인

### 위젯이 열리지 않음

- 브라우저 콘솔에서 에러 메시지 확인
- 환경 변수가 올바르게 설정되었는지 확인
- 개발 서버를 재시작했는지 확인

### 파일 업로드 실패

- 파일 크기가 100MB 이하인지 확인
- 인터넷 연결 상태 확인
- Cloudinary 무료 플랜 한도(25GB)를 초과하지 않았는지 확인
