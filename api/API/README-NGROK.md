# ngrok Setup Instructions

This project uses ngrok to expose the API publicly. Follow these steps to set up ngrok on your computer.

## Quick Start

1. **First-time setup** (run once):
   ```bash
   ./setup-ngrok.sh
   ```

2. **Start the API with ngrok**:
   ```bash
   ./start-ngrok.sh
   ```

## Manual Setup

If the scripts don't work, you can set up ngrok manually:

1. **Install ngrok** (if not already installed):
   - macOS: `brew install ngrok/ngrok/ngrok`
   - Or download from: https://ngrok.com/download

2. **Configure ngrok token**:
   ```bash
   ngrok config add-authtoken 34ZuL2MbrswnXvlte6d6JXlGU18_79i8SQ5jFyATjVE6ZyiQJ
   ```

3. **Start ngrok** (in a separate terminal):
   ```bash
   ngrok http 192.168.1.5:5074 --domain=unchalked-arboreally-chase.ngrok-free.dev
   ```
   (Replace `192.168.1.5` with your local IP address if different)

4. **Start the API** (in another terminal):
   ```bash
   dotnet run
   ```

## Public URLs

- **API Base**: https://unchalked-arboreally-chase.ngrok-free.dev
- **Swagger UI**: https://unchalked-arboreally-chase.ngrok-free.dev/swagger

## Notes

- The ngrok token is shared for team use
- Make sure your API is running on port 5074 before starting ngrok
- The ngrok tunnel must be running for the public URL to work
- On first visit, ngrok free tier shows a warning page - click "Visit Site" to proceed

